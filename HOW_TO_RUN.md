# 🚀 QUICK START GUIDE - Running Your C Program

## ✅ TWO OPTIONS TO RUN THE PROGRAM

---

## OPTION 1: Use Online C Compiler (EASIEST - No Installation!)

### Step-by-Step Instructions:

1. **Open an Online C Compiler:**
   - Go to: https://www.onlinegdb.com/online_c_compiler
   - OR: https://www.programiz.com/c-programming/online-compiler/
   - OR: https://replit.com/languages/c

2. **Upload the File:**
   - Find the file: `travel_planner_single_file.c` in your project folder
   - Open it with Notepad
   - Copy ALL the code (Ctrl+A, then Ctrl+C)

3. **Paste into Online Compiler:**
   - Delete any existing code in the online editor
   - Paste your code (Ctrl+V)

4. **Click RUN:**
   - Click the "Run" or "Execute" button
   - You'll see the output showing routes between Indian cities!

### Expected Output:
```
========================================
  Travel Route Planner - India (C)    
========================================

Initialized with 8 cities and 8 routes

=== Graph Information ===
Total Cities: 8
Total Routes: 8

1. Delhi (del)
2. Mumbai (mum)
3. Bangalore (blr)
4. Chennai (chen)
5. Kolkata (kol)
6. Jaipur (jaipur)
7. Pune (pune)
8. Ahmedabad (ahm)

========================================
  Testing Route: Delhi to Mumbai       
========================================

=== Route Found ===
Algorithm: Dijkstra's Algorithm
Path: Delhi -> Mumbai

Metrics:
Total Distance: 1400 km
Total Time: 2.5 hours
Total Cost: Rs.3500
```

---

## OPTION 2: Install GCC and Compile Locally

### Step 1: Install GCC Compiler

**Download TDM-GCC (Easiest for Windows):**
1. Go to: https://jmeubank.github.io/tdm-gcc/
2. Download: `tdm64-gcc-10.3.0-2.exe`
3. Run installer
4. Check "Add to PATH" option
5. Complete installation
6. **Restart your computer** (important!)

### Step 2: Verify GCC Installation

Open **NEW** Command Prompt and type:
```bash
gcc --version
```

Should show something like:
```
gcc (tdm64-1) 10.3.0
```

### Step 3: Compile the Program

Open Command Prompt in your project folder:
```bash
cd "c:\Users\User\Documents\dsa mini project\travel planner"
```

**Option A: Use the build script:**
```bash
build.bat
```

**Option B: Manual compilation:**
```bash
gcc -o travel_planner main.c graph.c algorithms.c data.c -lm
```

**Option C: Compile single file version:**
```bash
gcc -o travel_planner_single travel_planner_single_file.c -lm
```

### Step 4: Run the Program

```bash
travel_planner.exe
```

Or if you compiled the single file:
```bash
travel_planner_single.exe
```

---

## 📝 What Each Method Does:

### Multiple Files Method (Recommended for Learning):
- **graph.h** - Header with definitions
- **graph.c** - Graph implementation
- **algorithms.c** - Pathfinding algorithms
- **data.c** - Sample city data
- **main.c** - Main program

### Single File Method (Easy for Online):
- **travel_planner_single_file.c** - Everything in one file
- Easier to copy/paste to online compilers
- Same functionality

---

## 🎯 Quick Test - Use Online Compiler NOW!

1. Open: https://www.onlinegdb.com/online_c_compiler
2. Open file: `travel_planner_single_file.c` with Notepad
3. Copy all code (Ctrl+A, Ctrl+C)
4. Paste into online compiler
5. Click "Run"
6. See your program work! 🎉

---

## ❓ Troubleshooting

### Online Compiler:
- **Timeout error**: Program is too long, try a different compiler
- **Compile error**: Make sure you copied ALL the code
- **No output**: Click "Run" button

### Local Compilation:
- **gcc not found**: 
  - Restart computer after installing
  - Open NEW command prompt
  - Check PATH environment variable

- **Compilation errors**:
  - Ensure all .c files are in same folder
  - Use `-lm` flag for math library

---

## 💡 Recommendation:

**For immediate testing**: Use Option 1 (Online Compiler)
**For project submission**: Use Option 2 (Install GCC)

---

## 📞 Need Help?

If you have issues:
1. Try online compiler first (easiest)
2. Check INSTALL_GCC_WINDOWS.md for detailed GCC installation
3. Make sure you copied the entire single file code

---

**You're ready to run your C program! 🚀**
