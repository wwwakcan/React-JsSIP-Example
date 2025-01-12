# React JsSIP Example

[English](#english) | [Türkçe](#turkish)

# English

This project is a WebRTC-based SIP (Session Initiation Protocol) client built using React and JsSIP. It supports basic VoIP functionalities (making calls, answering incoming calls, rejecting calls, etc.).

## Features
- 📞 Make voice calls
- 📱 Answer/reject incoming calls
- 🔄 End active calls
- 🔊 Audio-only support (no video support)
- ⚡ Low latency with WebRTC technology
- 🔒 STUN/TURN server support

## Requirements
- Node.js (>= 14.0.0)
- React (>= 16.8.0)
- JsSIP library
- WebRTC-enabled modern web browser
- Running Asterisk server

## Installation
1. Clone the project:
```bash
git clone https://github.com/wwwakcan/React-JsSIP-Example.git
cd React-JsSIP-Example
```

2. Install dependencies:
```bash
npm install
```

3. Set up the required environment variables (in `.env` file):
```env
REACT_APP_ASTERISK_SERVER=your-asterisk-server
REACT_APP_ASTERISK_SOCKET_SERVER=your-websocket-server
REACT_APP_SIP_USERNAME=your-username
REACT_APP_SIP_PASSWORD=your-password
REACT_APP_STUN_SERVER=your-stun-server
REACT_APP_TURN_SERVER=your-turn-server
```

4. Start the application:
```bash
npm start
```

## Configuration
### SIP Server Settings
Update the following values in `App.js` according to your SIP server:
```javascript
let StartSipModel = new JsSIP.UA({
    sockets: [
        new JsSIP.WebSocketInterface("wss://<asterisk-socket-server>:8089/ws")
    ],
    uri: "sip:<sip-username>@<asterisk-server>",
    password: "<sip-password>",
    // ... other settings
});
```

### ICE Server Settings
Update the STUN/TURN server configuration according to your servers:
```javascript
const iceServer = [
    {
        urls: ['stun:stun.l.google.com:19302']
    },
    {
        urls: ["stun:<stun-server>:<stun-port>"],
        username: "username",
        credential: "password"
    },
    {
        urls: ["turn:<turn-server>:<turn-port>"],
        username: "username",
        credential: "password"
    }
];
```

## Usage
The application supports four basic functions:
1. **Making Calls**: Click the "CALL" button to make a call to the specified SIP address.
2. **Ending Calls**: Use the "END" button to terminate the active call.
3. **Answering Calls**: Use the "ANSWER" button to accept incoming calls.
4. **Rejecting Calls**: Use the "REJECT" button to reject incoming calls.

## Event Listeners
The application monitors and logs the following SIP events to the console:
- Connecting
- Connected
- Disconnected
- Registered
- Unregistered
- Registration Failed
- New RTC Session

## WebRTC Statistics
The application collects WebRTC statistics for active calls:
- ICE connection status
- General call statistics

## Debugging
All important events are logged to the console. Check the browser developer tools console for troubleshooting.

## Security Notes
- Use environment variables instead of storing sensitive information (username, password, server addresses, etc.) directly in the code
- Use secure WebSocket connection (WSS) in production environment
- Use strong credentials for TURN server

## Contributing
1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.

## Contact
Project Link: [https://github.com/wwwakcan/React-JsSIP-Example](https://github.com/wwwakcan/React-JsSIP-Example)

---

# Turkish

Bu proje, React ve JsSIP kullanarak oluşturulmuş bir WebRTC tabanlı SIP (Session Initiation Protocol) istemcisidir. Temel VoIP işlevlerini (arama yapma, gelen aramaları yanıtlama, reddetme vb.) destekler.

## Özellikler
- 📞 Sesli arama yapabilme
- 📱 Gelen aramaları yanıtlama/reddetme
- 🔄 Aktif aramaları sonlandırma
- 🔊 Yalnızca ses desteği (video desteği yok)
- ⚡ WebRTC teknolojisi ile düşük gecikme
- 🔒 STUN/TURN sunucu desteği

## Gereksinimler
- Node.js (>= 14.0.0)
- React (>= 16.8.0)
- JsSIP kütüphanesi
- WebRTC destekli modern bir web tarayıcısı
- Çalışan bir Asterisk sunucusu

## Kurulum
1. Projeyi klonlayın:
```bash
git clone https://github.com/wwwakcan/React-JsSIP-Example.git
cd React-JsSIP-Example
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Gerekli ortam değişkenlerini ayarlayın (`.env` dosyasında):
```env
REACT_APP_ASTERISK_SERVER=your-asterisk-server
REACT_APP_ASTERISK_SOCKET_SERVER=your-websocket-server
REACT_APP_SIP_USERNAME=your-username
REACT_APP_SIP_PASSWORD=your-password
REACT_APP_STUN_SERVER=your-stun-server
REACT_APP_TURN_SERVER=your-turn-server
```

4. Uygulamayı başlatın:
```bash
npm start
```

## Yapılandırma
### SIP Sunucu Ayarları
`App.js` içerisinde aşağıdaki değerleri kendi SIP sunucunuza göre güncelleyin:
```javascript
let StartSipModel = new JsSIP.UA({
    sockets: [
        new JsSIP.WebSocketInterface("wss://<asterisk-socket-server>:8089/ws")
    ],
    uri: "sip:<sip-username>@<asterisk-server>",
    password: "<sip-password>",
    // ... diğer ayarlar
});
```

### ICE Sunucu Ayarları
STUN/TURN sunucu yapılandırmasını kendi sunucularınıza göre güncelleyin:
```javascript
const iceServer = [
    {
        urls: ['stun:stun.l.google.com:19302']
    },
    {
        urls: ["stun:<stun-server>:<stun-port>"],
        username: "username",
        credential: "password"
    },
    {
        urls: ["turn:<turn-server>:<turn-port>"],
        username: "username",
        credential: "password"
    }
];
```

## Kullanım
Uygulama dört temel işlevi destekler:
1. **Arama Yapma**: "CALL" butonuna tıklayarak belirtilen SIP adresine arama yapabilirsiniz.
2. **Aramayı Sonlandırma**: "END" butonu ile aktif aramayı sonlandırabilirsiniz.
3. **Aramayı Yanıtlama**: "ANSWER" butonu ile gelen aramaları kabul edebilirsiniz.
4. **Aramayı Reddetme**: "REJECT" butonu ile gelen aramaları reddedebilirsiniz.

## Olay Dinleyiciler
Uygulama, aşağıdaki SIP olaylarını izler ve konsola bilgi yazdırır:
- Bağlanıyor (connecting)
- Bağlandı (connected)
- Bağlantı Kesildi (disconnected)
- Kayıt Oldu (registered)
- Kayıt Silindi (unregistered)
- Kayıt Başarısız (registrationFailed)
- Yeni RTC Oturumu (newRTCSession)

## WebRTC İstatistikleri
Uygulama, aktif çağrılar için WebRTC istatistiklerini toplar:
- ICE bağlantı durumu
- Genel çağrı istatistikleri

## Hata Ayıklama
Tüm önemli olaylar konsola kaydedilir. Sorun giderme için tarayıcı geliştirici araçlarının konsolunu kontrol edin.

## Güvenlik Notları
- Hassas bilgileri (kullanıcı adı, şifre, sunucu adresleri vb.) doğrudan kodda saklamak yerine environment variable kullanın
- Production ortamında güvenli WebSocket bağlantısı (WSS) kullanın
- TURN sunucusu için güçlü kimlik bilgileri kullanın

## Katkıda Bulunma
1. Bu repo'yu fork edin
2. Feature branch'inizi oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## Lisans
Bu proje [MIT](https://choosealicense.com/licenses/mit/) lisansı altında lisanslanmıştır.

## İletişim
Proje Linki: [https://github.com/wwwakcan/React-JsSIP-Example](https://github.com/wwwakcan/React-JsSIP-Example)
