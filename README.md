# Welcome to our project

## Project info
> A smart system for improving blood availability, donor communication, and emergency response — connecting **hospitals**, **blood banks**, and **donors** in real time.

**URL**: https://redline-rho.vercel.app/

# 👋 Meet Our Team

> The creative minds behind **RedLine** 🩸🚑

| Member | Introduction |
|--------|--------------|
| 👨‍💻 **Hi, I’m Shrotriya Ghosh! (C-196)** | I worked on system modules and the integration between hospitals and blood banks. I focus on backend workflows and inventory logic. |
| 👨‍💻 **Hi, I’m Suvrajit Patari! (C-181)** | I worked on the decision logic, matching engine and notification flows. I love designing resilient workflows for emergencies. |
| 👨‍💻 **Hi, I’m Sovan De! (C-199)** | I focused on the frontend dashboard and user-facing interfaces so stakeholders can respond quickly to requests. |
| 👨‍💻 **Hi, I’m Aryan Singh! (C-166)** | I helped design the ERD, sequence flows, and deployment ideas — making sure the system is maintainable and scalable. |

---

# 🩸 RedLine — Smart Blood Donation Management System 🚨

> A smart system for improving blood availability, donor communication, and emergency response — connecting **hospitals**, **blood banks**, and **donors** in real time.

---

## 🚀 Project Overview
**RedLine** is a smart blood-donation management platform designed to optimize blood availability and minimize delays during emergencies.  
It connects hospitals, blood banks, and donors using real-time data, location-based alerts, and automated decision logic to ensure fast and accurate blood distribution.

---

## ✨ Key Features
- 🆘 **Emergency Request Handling:** Hospitals can raise urgent blood requests with automatic routing.  
- 🔍 **Smart Matching Engine:** Matches requests to hospital inventory, nearby banks, or eligible donors using urgency, blood type, and proximity.  
- 🔔 **Instant Notifications:** Push alerts to donors, banks, and hospital staff.  
- 🗂️ **Inventory Management:** Track blood stock levels at hospitals and banks.  
- 👤 **Role-based Dashboards:** Separate views for Admin, Hospital, Blood Bank, and Donor.  
- 📈 **Logs & Audit Trails:** Maintain a history of requests, matches, and dispatch events.

---

## 🧠 System Architecture


**Modules Included**
- 👤 Authentication & Role Management (Admin, Hospital, Bank, Donor)  
- 🏥 Hospital Portal (Raise requests, view matches)  
- 🩸 Blood Bank Portal (Inventory updates)  
- ❤️ Donor Portal (Availability & response)  
- ⚙️ Admin Panel (Manage users, inventory, policies)  
- 🔔 Notification Service (FCM / SMS integration)

---


## 🩸 Blood Matching Workflow

**Level 0 — Overview**
- Hospital raises request → System checks hospital and bank inventory → Notifies donors if needed → Dispatch arranged.

**Level 1 — Administration**
- Admin manages donors, inventory, and platform settings.  
- Admin monitors alerts and escalations.

**Level 2 — Stakeholders**
- Hospitals send requests and receive matches.  
- Banks update inventory and approve dispatches.  
- Donors receive alerts and can confirm availability.


---

## ⚙️ Technical Requirements
| Category | Details |
|----------|---------|
| 🧩 Frontend | React / Angular (Responsive dashboards) |
| ⚙️ Backend | Python (FastAPI / Flask) or Node.js (Express) |
| 🗄️ Database | MongoDB / PostgreSQL / Firebase |
| ☁️ Hosting | AWS / GCP / Azure / Heroku |
| 🔔 Notifications | Firebase Cloud Messaging (FCM), Twilio (SMS) |
| 🗺️ Location | Google Maps API or GPS-based matching |

---

## 🧩 Functional Requirements
- ✅ Emergency blood request creation & tracking  
- ✅ Smart matching & prioritization by urgency and proximity  
- ✅ Role-based access & dashboards  
- ✅ Inventory updates and audit logs  
- ✅ Notification & escalation workflows

---

## 🔬 Feasibility Study

| Type | Notes |
|------|-------|
| ⚙️ Technical | Uses standard web and mobile technologies; can be deployed on cloud with scalable DB and notification services. |
| 💰 Economic | Cloud deployment and donor outreach are cost-effective relative to lives saved and operational efficiencies. |
| 🧑‍⚕️ Operational | Hospitals and banks benefit immediately from improved coordination; training and integration are key to adoption. |

---

## ⚠️ Limitations
1. **Donor Response Variability** — Donor response is voluntary; time-critical matches depend on donor availability.  
2. **Infrastructure Dependency** — Requires internet/GPS which may be unreliable in remote areas.  
3. **Adoption Resistance** — Hospitals and banks may resist switching from legacy workflows.

---

## 💡 How We Improve
- Introduce incentives (rewards, recognitions) for donors.  
- Predict donor availability using historical response patterns.  
- Allow pre-registration for emergency standby volunteers.  
- Offer training, demos, and hospital system integration to ease adoption.  
- Implement offline caching and low-data modes for connectivity-challenged areas.

---

## 🧭 How It Works (User Flow)
1. 🏥 Hospital raises an emergency blood request (blood type, units, urgency, location).  
2. 🔍 System checks hospital inventory and nearby blood banks.  
3. 🔔 If needed, system broadcasts alert to eligible donors in proximity.  
4. 🚑 Dispatch arranged from the chosen source; admin and stakeholders notified.  
5. 📦 Inventory updated and logs saved for audit.

---

## 🔮 Future Enhancements
- 📈 AI-powered donor availability prediction & prioritization  
- 🔗 Integrations with national donor registries & hospital EMRs  
- 📲 Dedicated mobile apps for donors, hospitals, and banks  
- 📊 Analytics dashboard for donation trends and capacity planning

---

## 👥 Team Members
| Name | Role | ID |
|------|------|----|
| Shrotriya Ghosh | Backend & Integration | C-196 |
| Suvrajit Patari | Matching Logic & Notifications | C-181 |
| Sovan De | Frontend & UI/UX | C-199 |
| Aryan Singh | Data Modeling & Diagrams | C-166 |

---

## 📦 Repo Structure (suggested)


**High-level workflow**


---

## 📩 Contact
📞 +91-9362241098  
🌐 https://redline-rho.vercel.app/
📧 team.redline@support.com

---

**© 2025 RedLine — Smart Blood Donation Management System**  
*Designed with ❤️ by Team RedLine (CSE, Section C)*

