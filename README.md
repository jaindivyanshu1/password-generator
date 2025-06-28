# 🔒 Password Generator App

A modern, responsive password generator built with React and TypeScript, supporting IndexedDB to store previously generated passwords. Users can select password length, character set, and view a history of generated passwords.

![Flow Diagram](./flow-diagram.png)

---

## 📄 Project Description

This application allows users to generate random secure passwords based on configurable criteria including length, character type (alphabets, numbers, symbols), and stores these generated passwords using the browser's IndexedDB. It ensures no duplicate password is stored, by checking existing passwords before saving. The app is fully responsive and theme-driven to support modern devices.

---

## 🏷️ Tech Stack

- React (TypeScript)
- Vite
- IndexedDB (via idb)
- CSS Modules
- HTML5 & modern JavaScript

---

## 🧮 Algorithm Used

- **Random password generation** using a customizable character pool
- **Uniqueness guarantee** by checking generated passwords against IndexedDB records
- **Retry loop** to regenerate random strings if duplicates are found, with a cap on maximum attempts for safety
- **Loader logic** to provide feedback during async operations

---

## 🗂️ Flow

1. User navigates to **Password Generator** tab  
   → enters password length  
   → selects options (alphabets/numbers/symbols)  
   → clicks Generate  
   → shows loader  
   → checks if password exists in IndexedDB  
   → if not found, saves password and displays it  
   → if found, regenerates until unique

2. User navigates to **Password List** tab  
   → fetches all stored passwords from IndexedDB  
   → shows loader  
   → displays the list

---

## 📁 Project Files

- `src/` → React components and logic  
- `services/indexedDB.ts` → IndexedDB storage layer  
- `styles/` → theme & CSS Modules  
- `public/flow-diagram.png` → stores the app flow diagram (add your actual diagram image in this path)

---

