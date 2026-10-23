/* ASPPS Comprehensive Website Assistant with Typewriter Animation */
(function () {
  "use strict";

  const SCHOOL = {
    name: "Ajay Satya Prakash Public School",
    short: "ASPPS",
    phone: "+91-761-2350211",
    phoneAlt: ["+91 9691142224", "+91 6262225081"],
    email: "aspps011@gmail.com",
    address: "Panagar, Keolari, Jabalpur, Madhya Pradesh – 483220",
    hours: "Monday – Saturday, 8:00 AM – 2:00 PM",
    classes: "Class 1 to Class 12",
    board: "CBSE",
    medium: "English",
    established: "2012",
    affiliationNo: "1030757"
  };

  const BOT = {
    storageKey: "aspps_complete_bot_v1"
  };

  const a = (href, text) => `<a href="${href}" ${href.startsWith("http") || href.endsWith(".pdf") ? 'target="_blank" rel="noopener"' : ""}>${text}</a>`;
  const tel = a("tel:" + SCHOOL.phone.replace(/[^\d+]/g, ""), SCHOOL.phone);
  const mail = a("mailto:" + SCHOOL.email, SCHOOL.email);
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(SCHOOL.name + " Panagar Jabalpur");
  const contactLine = `📞 ${tel}<br>✉️ ${mail}`;

  /* Comprehensive Option Mapping Based on index.html Structure */
  const FIXED_OPTIONS = {
    "Main Menu": {
      text: `👋 Welcome back to <strong>${SCHOOL.short}</strong> Assistant! Please select an area below to explore:`,
      next: ["About School", "Administration", "Academics", "Facilities", "Students", "Quick Links"]
    },
    "About School": {
      text: `🏫 <strong>About ${SCHOOL.name}</strong><br>
             Located in Panagar, Jabalpur, ASPPS combines strong academics with values, sports, arts, and student-first learning environments.<br><br>
             • <strong>Board:</strong> ${SCHOOL.board} (Affiliation No. ${SCHOOL.affiliationNo})<br>
             • <strong>Classes:</strong> ${SCHOOL.classes} (${SCHOOL.medium} Medium)<br>
             • <strong>Established:</strong> ${SCHOOL.established}`,
      next: ["Aims & Objectives", "School Info", "School Documentary", "Main Menu"]
    },
    "Aims & Objectives": {
      text: `🎯 <strong>Aims and Objectives:</strong><br>
             • <strong>Primary Classes (1st to 8th):</strong> Strong foundations in language, math, science, and social studies.<br>
             • <strong>Senior Classes (9th to 12th):</strong> Focused board preparation, discipline, and future academic goals.<br>
             • <strong>Skills & Activities:</strong> Computer learning, sports, arts, music, dance, and extracurricular experiences.`,
      next: ["Academics", "Facilities", "About School", "Main Menu"]
    },
    "School Info": {
      text: `📋 <strong>School Information Overview:</strong><br>
             Ajay Satya Prakash Public School offers structured learning from foundational to senior school with a focus on discipline, creativity, and confidence.<br><br>
             📍 <strong>Address:</strong> ${SCHOOL.address}<br>
             🕒 <strong>Hours:</strong> ${SCHOOL.hours}`,
      next: ["Admission", "Fees & Contact", "About School", "Main Menu"]
    },
    "School Documentary": {
      text: `🎥 Explore our campus life and student documentary video!<br><br>
             Watch the visual journey on our dedicated ${a("documentary.html", "School Documentary page")}.`,
      next: ["Gallery", "Campus Infrastructure", "About School", "Main Menu"]
    },
    "Administration": {
      text: `👔 <strong>Administration & Leadership:</strong><br>
             Read inspiring messages from our leadership or view faculty details below:`,
      next: ["Director's Message", "Principal's Message", "Chairman's Message", "Staff Details", "Main Menu"]
    },
    "Director's Message": {
      text: `✍️ Read the inspiring ${a("director-message.html", "Director's Message")} detailing our core vision and dedication to student growth.`,
      next: ["Principal's Message", "Chairman's Message", "Administration", "Main Menu"]
    },
    "Principal's Message": {
      text: `✍️ Read the ${a("principal-message.html", "Principal's Message")} regarding academic excellence, discipline, and character building.`,
      next: ["Director's Message", "Staff Details", "Administration", "Main Menu"]
    },
    "Chairman's Message": {
      text: `✍️ Read the ${a("chairman-message.html", "Chairman's Message")} on our foundational goals and commitment to quality education in Jabalpur.`,
      next: ["Director's Message", "Principal's Message", "Administration", "Main Menu"]
    },
    "Staff Details": {
      text: `👩‍🏫 Our experienced and qualified teaching faculty guide students across all grades.<br><br>
             View the complete staff roster in our ${a("pdf/staff_details.pdf", "Staff Details PDF document")}.`,
      next: ["Academics", "Administration", "Main Menu"]
    },
    "Academics": {
      text: `📖 <strong>Academics & Curriculum:</strong><br>
             We follow the <strong>${SCHOOL.board}</strong> curriculum with robust teaching methodologies.<br><br>
             • Explore ${a("#admission", "Admission procedures")}<br>
             • Review ${a("#terms", "Terms and Conditions")}<br>
             • Check ${a("#cbse", "CBSE Mandatory Disclosure")}`,
      next: ["Admission", "Terms & Conditions", "CBSE Disclosure", "Main Menu"]
    },
    "Admission": {
      text: `🎓 <strong>Admissions Open for ${SCHOOL.classes}!</strong><br>
             1. Visit the school office in Panagar, Jabalpur, or contact us directly.<br>
             2. Our office will guide you through forms, age criteria, and document requirements.<br><br>
             ${contactLine}<br>🕒 ${SCHOOL.hours}`,
      next: ["Fees Info", "Uploaded TC", "Contact Us", "Main Menu"]
    },
    "Terms & Conditions": {
      text: `📜 Please review our academic guidelines, school uniform policies, and code of conduct under ${a("#terms", "Terms and Conditions")}.`,
      next: ["Academics", "Admission", "Main Menu"]
    },
    "CBSE Disclosure": {
      text: `📄 Access all mandatory government recognitions, safety certificates, and disclosures on our ${a("#cbse", "CBSE Mandatory Public Disclosure section")}.<br><br><strong>Affiliation No:</strong> ${SCHOOL.affiliationNo}`,
      next: ["School Info", "Academics", "Main Menu"]
    },
    "Facilities": {
      text: `🏢 <strong>Campus & Facilities:</strong><br>
             Explore our state-of-the-art infrastructure built to foster holistic student development.`,
      next: ["Campus Infrastructure", "Laboratories", "Library", "Main Menu"]
    },
    "Campus Infrastructure": {
      text: `🏫 Our campus includes modern well-lit classrooms, secure play areas, and advanced student amenities. Check out ${a("#infrastructure", "Infrastructure Details")}.`,
      next: ["Laboratories", "Library", "Facilities", "Main Menu"]
    },
    "Laboratories": {
      text: `🔬 We provide fully equipped science labs (Physics, Chemistry, Biology) and computer labs for hands-on practical learning. See ${a("#laboratories", "Laboratories")}.`,
      next: ["Library", "Campus Infrastructure", "Facilities", "Main Menu"]
    },
    "Library": {
      text: `📚 Our well-stocked ${a("#library", "School Library")} supports reading habits, reference books, and academic research for all grade levels.`,
      next: ["Laboratories", "Campus Infrastructure", "Facilities", "Main Menu"]
    },
    "Students": {
      text: `🎓 <strong>Student Corner:</strong><br>
             Stay updated with school announcements, circulars, and exam timetables.`,
      next: ["News and Updates", "Gallery", "Uploaded TC", "Main Menu"]
    },
    "News and Updates": {
      text: `📢 Check our notice board for recent circulars, exam schedules, and student achievements in ${a("#news", "News and Updates")}.`,
      next: ["Students", "Gallery", "Main Menu"]
    },
    "Gallery": {
      text: `📸 <strong>Campus Photo Gallery:</strong><br>
             Explore moments and memories of student life, sports, and celebrations at ASPPS on our ${a("#gallery", "Gallery Section")}.`,
      next: ["School Documentary", "Campus Infrastructure", "Main Menu"]
    },
    "Quick Links": {
      text: `🔗 <strong>Quick Links:</strong>`,
      next: ["Contact Us", "Uploaded TC", "Location Map", "Main Menu"]
    },
    "Contact Us": {
      text: `📞 <strong>Get in Touch:</strong><br>
             Phone: ${tel}<br>
             Email: ${mail}<br>
             Address: ${SCHOOL.address}<br><br>
             Visit the ${a("#contact", "Admission Enquiry Form")} directly.`,
      next: ["Location Map", "Timings", "Admission", "Main Menu"]
    },
    "Uploaded TC": {
      text: `🗂️ Official School Leaving Certificates / Transfer Certificates are accessible via ${a("#tc", "Uploaded TC")}.`,
      next: ["Admission", "Contact Us", "Main Menu"]
    },
    "Location Map": {
      text: `📍 <strong>School Location:</strong><br>
             Panagar, Keolari, Jabalpur, M.P. 483220<br><br>
             ${a(mapUrl, "🗺️ Open Location in Google Maps")}`,
      next: ["Contact Us", "Timings", "Main Menu"]
    },
    "Timings": {
      text: `🕒 <strong>Working Hours:</strong><br>
             ${SCHOOL.hours}<br>
             *(Please call ahead on holidays or exam days).*`,
      next: ["Contact Us", "Location Map", "Main Menu"]
    }
  };

  const DEFAULT_OPTIONS = ["About School", "Admission", "Academics", "Facilities", "Students", "Contact Us"];

  /* ============================================================
     2. UI SETUP & TYPEWRITER ENGINE
     ============================================================ */
  const mount = typeof document !== "undefined" && document.getElementById("aspps-ai");
  if (!mount) return;

  mount.innerHTML = `
    <div class="ai-chatbot">
      <button class="ai-button" id="aiOpen" type="button" aria-label="Open AI chatbot" aria-expanded="false">💬</button>
      <div class="ai-window" id="aiWindow" role="dialog" aria-label="${SCHOOL.short} Assistant" aria-hidden="true">
        <div class="ai-header">
          <div class="ai-title">🤖 ${SCHOOL.short} Assistant</div>
          <button id="aiClose" type="button" aria-label="Close chatbot">✕</button>
        </div>
        <div class="ai-body" id="aiBody" aria-live="polite"></div>
        <div class="ai-suggestions" id="aiSuggestions" aria-label="Select option"></div>
      </div>
    </div>`;

  const $ = (id) => document.getElementById(id);
  const openBtn = $("aiOpen"), closeBtn = $("aiClose"), win = $("aiWindow"),
        body = $("aiBody"), chips = $("aiSuggestions");

  const openChat = () => { win.classList.add("show"); win.setAttribute("aria-hidden", "false"); openBtn.setAttribute("aria-expanded", "true"); };
  const closeChat = () => { win.classList.remove("show"); win.setAttribute("aria-hidden", "true"); openBtn.setAttribute("aria-expanded", "false"); };

  openBtn.addEventListener("click", () => win.classList.contains("show") ? closeChat() : openChat());
  closeBtn.addEventListener("click", closeChat);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && win.classList.contains("show")) closeChat(); });

  let history = [];
  const save = () => { try { sessionStorage.setItem(BOT.storageKey, JSON.stringify(history.slice(-30))); } catch (e) {} };

  function addMessage(content, type) {
    const div = document.createElement("div");
    div.className = type === "user" ? "user-message" : "bot-message";
    if (type === "user") div.textContent = content; else div.innerHTML = content;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  /* HTML-Safe Gemini Typewriter Effect */
  function typeWriterHTML(element, html, callback) {
    element.innerHTML = "";
    const tokens = html.match(/(<\/?[^>]+(>|$)|[^<]+)/g) || [];
    let i = 0;

    const cursor = document.createElement("span");
    cursor.className = "ai-cursor";
    cursor.textContent = "▋";
    element.appendChild(cursor);

    function step() {
      if (i < tokens.length) {
        const token = tokens[i++];
        cursor.remove();

        if (token.startsWith("<") && token.endsWith(">")) {
          element.insertAdjacentHTML("beforeend", token);
          element.appendChild(cursor);
          body.scrollTop = body.scrollHeight;
          setTimeout(step, 4);
        } else {
          let charIdx = 0;
          const textSpan = document.createElement("span");
          element.appendChild(textSpan);

          function typeChar() {
            if (charIdx < token.length) {
              textSpan.textContent += token[charIdx++];
              element.appendChild(cursor);
              body.scrollTop = body.scrollHeight;
              setTimeout(typeChar, 3); // High-speed realistic typing
            } else {
              element.appendChild(cursor);
              setTimeout(step, 6);
            }
          }
          typeChar();
        }
      } else {
        cursor.remove();
        if (callback) callback();
      }
    }
    step();
  }

  function renderOptions(optionsList) {
    chips.innerHTML = "";
    optionsList.forEach(label => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.addEventListener("click", () => selectOption(label));
      chips.appendChild(btn);
    });
  }

  let busy = false;
  function selectOption(label) {
    if (busy) return;
    busy = true;
    addMessage(label, "user");
    chips.innerHTML = "";

    const optionData = FIXED_OPTIONS[label] || FIXED_OPTIONS["Main Menu"];

    const typing = document.createElement("div");
    typing.className = "bot-message ai-typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const botMsgDiv = addMessage("", "bot");
      
      typeWriterHTML(botMsgDiv, optionData.text, () => {
        history.push({ content: optionData.text, type: "bot" });
        save();
        renderOptions(optionData.next || DEFAULT_OPTIONS);
        busy = false;
      });
    }, 200);
  }

  // Restore history or display welcome with typewriter effect
  try { history = JSON.parse(sessionStorage.getItem(BOT.storageKey) || "[]"); } catch (e) { history = []; }
  if (history.length) {
    history.slice(-10).forEach(m => addMessage(m.content, m.type));
    renderOptions(DEFAULT_OPTIONS);
  } else {
    const welcomeMsg = `👋 Welcome to <strong>${SCHOOL.short}</strong> Assistant!<br><br>Please select an option below to explore our website data:`;
    const botMsgDiv = addMessage("", "bot");
    typeWriterHTML(botMsgDiv, welcomeMsg, () => {
      history.push({ content: welcomeMsg, type: "bot" });
      save();
      renderOptions(DEFAULT_OPTIONS);
    });
  }
})();