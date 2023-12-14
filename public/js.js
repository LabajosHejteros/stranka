// Skript pro ikony (module)
const moduleScript = document.createElement('script');
moduleScript.type = 'module';
moduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
document.head.appendChild(moduleScript);

// Skript pro ikony (nomodule)
const nomoduleScript = document.createElement('script');
nomoduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
document.head.appendChild(nomoduleScript);
