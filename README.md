# React JsSIP Example
[English](#english) | [Türkçe](#Türkçe)
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
3. Create `.env` file in the project root and set up the required environment variables:
```env
REACT_APP_WEBSOCKET_URL=wss://your-asterisk-server:8089/ws
REACT_APP_SIP_DISPLAY_NAME=Your Name
REACT_APP_SIP_USERNAME=your-username
REACT_APP_SIP_PASSWORD=your-password
REACT_APP_SIP_DOMAIN=your-asterisk-domain
REACT_APP_TARGET_NUMBER=target-number
REACT_APP_STUN_SERVER=stun:your-stun-server:3478
REACT_APP_STUN_USERNAME=stun-username
REACT_APP_STUN_PASSWORD=stun-password
REACT_APP_TURN_SERVER=turn:your-turn-server:3478
REACT_APP_TURN_USERNAME=turn-username
REACT_APP_TURN_PASSWORD=turn-password
```
4. Start the application:
```bash
npm start
```
## Usage
The application provides four main functions through its user interface:
1. **Making Calls**: 
   - Click the "CALL" button to make a call
   - Button is disabled when not connected to SIP server
2. **Ending Calls**: 
   - Click the "END" button to terminate active call
   - Button is disabled when no active call exists
3. **Answering Calls**: 
   - Click the "ANSWER" button to accept incoming calls
   - Button is disabled when no incoming call exists
4. **Rejecting Calls**: 
   - Click the "REJECT" button to reject incoming calls
   - Button is disabled when no incoming call exists
## Connection Status
The application displays the current connection status which can be:
- disconnected
- connecting
- connected
## Security Notes
- All sensitive information is stored in environment variables
- Uses secure WebSocket connection (WSS)
- Supports STUN/TURN server authentication
## License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
## Contact
Project Link: [https://github.com/wwwakcan/React-JsSIP-Example](https://github.com/wwwakcan/React-JsSIP-Example)
---
# Türkçe
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
3. Proje kök dizininde `.env` dosyası oluşturun ve gerekli ortam değişkenlerini ayarlayın:
```env
REACT_APP_WEBSOCKET_URL=wss://your-asterisk-server:8089/ws
REACT_APP_SIP_DISPLAY_NAME=Your Name
REACT_APP_SIP_USERNAME=your-username
REACT_APP_SIP_PASSWORD=your-password
REACT_APP_SIP_DOMAIN=your-asterisk-domain
REACT_APP_TARGET_NUMBER=target-number
REACT_APP_STUN_SERVER=stun:your-stun-server:3478
REACT_APP_STUN_USERNAME=stun-username
REACT_APP_STUN_PASSWORD=stun-password
REACT_APP_TURN_SERVER=turn:your-turn-server:3478
REACT_APP_TURN_USERNAME=turn-username
REACT_APP_TURN_PASSWORD=turn-password
```
4. Uygulamayı başlatın:
```bash
npm start
```
## Kullanım
Uygulama kullanıcı arayüzü üzerinden dört temel işlev sunar:
1. **Arama Yapma**: 
   - "CALL" butonuna tıklayarak arama yapabilirsiniz
   - SIP sunucusuna bağlı değilken buton devre dışıdır
2. **Aramayı Sonlandırma**: 
   - "END" butonu ile aktif aramayı sonlandırabilirsiniz
   - Aktif arama yokken buton devre dışıdır
3. **Aramayı Yanıtlama**: 
   - "ANSWER" butonu ile gelen aramaları kabul edebilirsiniz
   - Gelen arama yokken buton devre dışıdır
4. **Aramayı Reddetme**: 
   - "REJECT" butonu ile gelen aramaları reddedebilirsiniz
   - Gelen arama yokken buton devre dışıdır
## Bağlantı Durumu
Uygulama mevcut bağlantı durumunu gösterir:
- disconnected (bağlantı kesildi)
- connecting (bağlanıyor)
- connected (bağlandı)
## Güvenlik Notları
- Tüm hassas bilgiler ortam değişkenlerinde saklanır
- Güvenli WebSocket bağlantısı (WSS) kullanır
- STUN/TURN sunucu kimlik doğrulamasını destekler
## Lisans
Bu proje [MIT](https://choosealicense.com/licenses/mit/) lisansı altında lisanslanmıştır.
## İletişim
Proje Linki: [https://github.com/wwwakcan/React-JsSIP-Example](https://github.com/wwwakcan/React-JsSIP-Example)
