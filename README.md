# ⚡ Vidyastra (Study War 12th) - Offline AI Tutor Web App & PWA

**Vidyastra** एक आधुनिक, तेज़ और ऑफ़लाइन-सक्षम (Offline-Capable) AI ट्यूटर वेब एप्लीकेशन है। इसे मुख्य रूप से कक्षा 12 (UP Board / NCERT) के विद्यार्थियों के लिए डिज़ाइन किया गया है ताकि वे बिना इंटरनेट के भी अपने संपूर्ण पाठ्यक्रम (विज्ञान, कला व भाषा वर्ग) के विस्तृत उत्तर और अवधारणाएँ समझ सकें।

---

## 🌟 प्रमुख विशेषताएँ (Key Features)

* **⚡ 100% ऑफ़लाइन कार्यक्षमता:** बिना इंटरनेट कनेक्शन के भी पूरा डेटाबेस काम करता है।
* **🎯 विस्तृत व क्रमबद्ध पाठ्यक्रम:** बेसिक से लेकर एडवांस तक 100% विस्तृत उत्तर।
* **🔮 नियॉन व ग्लासमोर्फिज़्म UI:** आकर्षक और आँखों के लिए आरामदायक डार्क-मोड इंटरफ़ेस।
* **🔍 इन-बिल्ट स्मार्ट सर्च इंजन:** कीवर्ड्स और प्राकृतिक भाषा को समझने वाला तेज़ खोज एल्गोरिदम।
* **📱 PWA Ready:** इसे सीधे मोबाइल में एंड्रॉइड ऐप (PWA / APK) की तरह इंस्टॉल किया जा सकता है।
* **💾 प्रोग्रेस प्रिजर्वेशन:** LocalStorage का उपयोग करके उपयोगकर्ता की प्राथमिकताओं को सुरक्षित रखना।

---

## 📚 पाठ्यक्रम कवरेज (Database Parts)

यह ऐप 10 अलग-अलग डेटा मॉड्यूल में विभाजित है:

| भाग (Part) | विषय (Subject) | मुख्य सामग्री |
| :--- | :--- | :--- |
| **Part 1** | भौतिक विज्ञान (Physics Part 1) | स्थिरविद्युतिकी, धारा विद्युत, गतिमान आवेश व चुंबकत्व |
| **Part 2** | भौतिक विज्ञान (Physics Part 2) | किरण प्रकाशिकी, तरंग प्रकाशिकी, परमाणु व नाभिक, अर्धचालक |
| **Part 3** | रसायन विज्ञान (Chemistry) | विलयन, वैद्युतरसायन, रासायनिक बलगतिकी, d-एवं f-ब्लॉक, उपसहसंयोजन यौगिक, कार्बनिक रसायन |
| **Part 4** | जीव विज्ञान (Biology) | पुष्पी पादपों में लैंगिक जनन, मानव जनन, आनुवंशिकी, जैव प्रौद्योगिकी, पारिस्थितिकी |
| **Part 5** | सामान्य हिंदी (General Hindi) | गद्य व काव्य साहित्य का इतिहास, जीवन परिचय, व्याकरण व निबंध |
| **Part 6** | अंग्रेजी (English) | Prose, Poetry, Vistas, Grammar (Transformation, Synthesis, Idioms) |
| **Part 7** | इतिहास (History) | ईंटें मनके तथा अस्थियां, राजा किसान और नगर, भक्ति-सूफी परंपराएं, महात्मा गांधी |
| **Part 8** | नागरिक शास्त्र (Political Science) | दो ध्रुवीयता का अंत, समकालीन दक्षिण एशिया, स्वतंत्र भारत में राजनीति |
| **Part 9** | भूगोल (Geography) | मानव भूगोल के मूल सिद्धांत, भारत: लोग और अर्थव्यवस्था (दोनों पुस्तकें) |
| **Part 10** | समाजशास्त्र एवं अर्थशास्त्र | भारतीय समाज, सामाजिक परिवर्तन, व्यष्टि व समष्टि अर्थशास्त्र (Micro/Macro) |

---

## 🛠️ टेक स्टैक (Tech Stack)

* **Frontend:** HTML5, CSS3 (Custom CSS, Glassmorphism & Neon Aesthetics)
* **Logic & Search Engine:** Vanilla JavaScript (ES6 Modules)
* **Data Persistence:** Browser LocalStorage API
* **Icons & Fonts:** FontAwesome 6, Google Fonts (Poppins & Orbitron)
* **Deployment:** GitHub Pages & PWA Builder

---

## 📁 फ़ाइल संरचना (Project Structure)

```text
vidyastra/
├── index.html         # मुख्य HTML संरचना और ऑनबोर्डिंग
├── style.css          # नियॉन डार्क थीम और यूआई स्टाइलिंग
├── app.js             # ऐप का लॉजिक, सर्च इंजन और डेटाबेस एग्रीगेटर
├── data_part1.js      # Physics Part 1 Knowledge Base
├── data_part2.js      # Physics Part 2 Knowledge Base
├── data_part3.js      # Chemistry Knowledge Base
├── data_part4.js      # Biology Knowledge Base
├── data_part5.js      # Hindi Knowledge Base
├── data_part6.js      # English Knowledge Base
├── data_part7.js      # History Knowledge Base
├── data_part8.js      # Political Science Knowledge Base
├── data_part9.js      # Geography Knowledge Base
├── data_part10.js     # Sociology & Economics Knowledge Base
└── README.md          # प्रोजेक्ट की जानकारी और गाइड

