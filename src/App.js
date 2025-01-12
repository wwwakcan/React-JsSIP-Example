import React, { useEffect, useRef, useState, useCallback } from "react";
import JsSIP from "jssip";


const ICE_SERVERS = [
    {
        urls: ['stun:stun.l.google.com:19302']
    },
    {
        urls: [process.env.REACT_APP_STUN_SERVER],
        username: process.env.REACT_APP_STUN_USERNAME,
        credential: process.env.REACT_APP_STUN_PASSWORD
    },
    {
        urls: [process.env.REACT_APP_TURN_SERVER],
        username: process.env.REACT_APP_TURN_USERNAME,
        credential: process.env.REACT_APP_TURN_PASSWORD
    }
];

// SIP Configuration
const SIP_CONFIG = {
    sockets: [
        new JsSIP.WebSocketInterface(process.env.REACT_APP_WEBSOCKET_URL)
    ],
    display_name: process.env.REACT_APP_SIP_DISPLAY_NAME,
    uri: `sip:${process.env.REACT_APP_SIP_USERNAME}@${process.env.REACT_APP_SIP_DOMAIN}`,
    password: process.env.REACT_APP_SIP_PASSWORD,
    registrar_server: process.env.REACT_APP_SIP_DOMAIN,
    contact_uri: `sip:${process.env.REACT_APP_SIP_USERNAME}@${process.env.REACT_APP_SIP_DOMAIN}`,
    authorization_user: process.env.REACT_APP_SIP_USERNAME,
    session_timers: true,
    register: true,
    use_preloaded_route: true,
    pcConfig: {
        rtcpMuxPolicy: "negotiate",
        iceServers: ICE_SERVERS
    }
};

// Common session options
const SESSION_OPTIONS = {
    pcConfig: {
        rtcpMuxPolicy: "negotiate",
        iceServers: ICE_SERVERS
    },
    mediaConstraints: {
        audio: true,
        video: false
    },
    rtcOfferConstraints: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
    }
};

const App = () => {
    const [session, setSession] = useState(null);
    const [incomingSession, setIncomingSession] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const JsSipHook = useRef(null);
    const audioRef = useRef(new Audio());

    // Handle WebRTC track event
    const handleTrackEvent = useCallback((event) => {
        if (audioRef.current) {
            audioRef.current.srcObject = event.streams[0];
            audioRef.current.play().catch(console.error);
        }
    }, []);

    // Handle ICE connection state changes
    const handleIceConnectionChange = useCallback((connection) => {
        console.log('ICE Connection State:', connection.iceConnectionState);
    }, []);

    // Setup SIP connection
    useEffect(() => {
        const setupSIP = () => {
            const ua = new JsSIP.UA(SIP_CONFIG);
            JsSipHook.current = ua;

            // SIP connection event handlers
            const eventHandlers = {
                connecting: () => {
                    console.log("JSSIP connecting");
                    setConnectionStatus('connecting');
                },
                connected: () => {
                    console.log("JSSIP connected");
                    setConnectionStatus('connected');
                },
                disconnected: () => {
                    console.log("JSSIP disconnected");
                    setConnectionStatus('disconnected');
                },
                registered: () => console.log("JSSIP registered"),
                unregistered: () => console.log("JSSIP unregistered", ua.isConnected()),
                registrationFailed: () => console.log("JSSIP registrationFailed", ua.isConnected()),
                newRTCSession: handleNewRTCSession
            };

            // Attach event handlers
            Object.entries(eventHandlers).forEach(([event, handler]) => {
                ua.on(event, handler);
            });

            ua.start();

            return () => {
                ua.stop();
                if (audioRef.current) {
                    audioRef.current.srcObject = null;
                }
            };
        };

        setupSIP();
    }, []);

    // Handle new RTC session
    const handleNewRTCSession = useCallback((data) => {
        if (data.originator === 'local') return;

        const newSession = data.session;
        setSession(newSession);
        setIncomingSession(newSession);

        console.log('newRTCSession ringing', newSession.remote_identity.uri.user);

        // Session event handlers
        const sessionEvents = {
            failed: () => {
                console.log('Session failed');
                setSession(null);
                setIncomingSession(null);
            },
            ended: () => {
                console.log('Session ended');
                setSession(null);
                setIncomingSession(null);
            },
            accepted: () => {
                console.log('Session accepted');
            }
        };

        // Attach session event handlers
        Object.entries(sessionEvents).forEach(([event, handler]) => {
            newSession.on(event, handler);
        });
    }, []);

    // Make outgoing call
    const makeCall = useCallback((uri) => {
        if (!JsSipHook.current || connectionStatus !== 'connected') {
            console.error('SIP connection not ready');
            return;
        }

        const newSession = JsSipHook.current.call(uri, SESSION_OPTIONS);
        setSession(newSession);

        // Setup event handlers for outgoing call
        newSession.connection.addEventListener("track", handleTrackEvent);
        newSession.connection.addEventListener("iceconnectionstatechange", () =>
            handleIceConnectionChange(newSession.connection)
        );

        // Monitor call statistics
        newSession.connection.getStats()
            .then(stats => {
                stats.forEach(stat => console.log("Call stats:", stat));
            })
            .catch(console.error);

        // Session event handlers
        const callEvents = {
            connecting: () => console.log("Call connecting"),
            progress: () => console.log('Call in progress'),
            failed: () => {
                console.log('Call failed');
                setSession(null);
                setIncomingSession(null);
            },
            ended: () => {
                console.log('Call ended');
                setSession(null);
                setIncomingSession(null);
            },
            accepted: () => console.log('Call answered')
        };

        // Attach call event handlers
        Object.entries(callEvents).forEach(([event, handler]) => {
            newSession.on(event, handler);
        });
    }, [connectionStatus, handleTrackEvent, handleIceConnectionChange]);

    // Answer incoming call
    const answerCall = useCallback(() => {
        if (!incomingSession) {
            console.log("No incoming call to answer");
            return;
        }

        incomingSession.answer(SESSION_OPTIONS);

        incomingSession.connection.addEventListener("track", handleTrackEvent);
        incomingSession.connection.addEventListener("iceconnectionstatechange", () =>
            handleIceConnectionChange(incomingSession.connection)
        );

        // Monitor call statistics
        incomingSession.connection.getStats()
            .then(stats => {
                stats.forEach(stat => console.log("Call stats:", stat));
            })
            .catch(console.error);
    }, [incomingSession, handleTrackEvent, handleIceConnectionChange]);

    // Reject incoming call
    const rejectCall = useCallback(() => {
        if (!incomingSession) {
            console.log("No incoming call to reject");
            return;
        }

        incomingSession.terminate();
        setSession(null);
        setIncomingSession(null);
    }, [incomingSession]);

    // End active call
    const endCall = useCallback(() => {
        if (!session) {
            console.log("No active call to end");
            return;
        }

        session.terminate();
        setSession(null);
        setIncomingSession(null);
    }, [session]);

    return (
        <div className="p-5">
            <div className="flex space-x-4">
                <button
                    onClick={() => makeCall(`sip:${process.env.REACT_APP_TARGET_NUMBER}@${process.env.REACT_APP_SIP_DOMAIN}`)}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    disabled={connectionStatus !== 'connected'}
                >
                    CALL
                </button>
                <button
                    onClick={endCall}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    disabled={!session}
                >
                    END
                </button>
                <button
                    onClick={answerCall}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={!incomingSession}
                >
                    ANSWER
                </button>
                <button
                    onClick={rejectCall}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    disabled={!incomingSession}
                >
                    REJECT
                </button>
            </div>
            <div className="mt-4">
                Connection Status: {connectionStatus}
            </div>
        </div>
    );
};

export default App;
