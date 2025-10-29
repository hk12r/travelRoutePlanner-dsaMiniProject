# How to Install GCC on Windows

## Quick Installation Steps:

### Method 1: Using MinGW-w64 (Recommended)

1. **Download MinGW-w64:**
   - Go to: https://sourceforge.net/projects/mingw-w64/files/
   - Download: `x86_64-posix-seh` version
   - Or direct link: https://github.com/niXman/mingw-builds-binaries/releases

2. **Install:**
   - Extract the downloaded file to `C:\mingw64`
   - The folder should contain `bin`, `lib`, `include` folders

3. **Add to PATH:**
   - Press `Windows + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "System Variables", find "Path", click "Edit"
   - Click "New" and add: `C:\mingw64\bin`
   - Click "OK" on all windows

4. **Verify Installation:**
   - Open NEW Command Prompt (important!)
   - Type: `gcc --version`
   - Should show GCC version info

### Method 2: Using TDM-GCC (Easier Installer)

1. **Download:**
   - Go to: https://jmeubank.github.io/tdm-gcc/
   - Download the installer (tdm64-gcc-10.3.0-2.exe or latest)

2. **Install:**
   - Run the installer
   - Choose "Create" installation
   - Select installation directory (default: C:\TDM-GCC-64)
   - Check "Add to PATH" option
   - Complete installation

3. **Verify:**
   - Open NEW Command Prompt
   - Type: `gcc --version`

### Method 3: Using MSYS2 (For Advanced Users)

1. Download from: https://www.msys2.org/
2. Install MSYS2
3. Open MSYS2 terminal
4. Run: `pacman -S mingw-w64-x86_64-gcc`
5. Add to PATH: `C:\msys64\mingw64\bin`

---

## After Installation:

Once GCC is installed and verified, you can compile the project:

```bash
# Navigate to project folder
cd "c:\Users\User\Documents\dsa mini project\travel planner"

# Compile using the build script
build.bat

# Or compile manually
gcc -o travel_planner main.c graph.c algorithms.c data.c -lm

# Run the program
travel_planner.exe
```

---

## Troubleshooting:

### "gcc not recognized" after installation:
- Make sure you opened a NEW command prompt
- Verify PATH was added correctly
- Restart computer if needed

### Compilation errors:
- Ensure all .c files are in the same folder
- Use `-lm` flag for math library
- Check file names match exactly

---

## Alternative: Online C Compiler (No Installation)

If you can't install GCC, use an online compiler:

1. **OnlineGDB**: https://www.onlinegdb.com/online_c_compiler
2. **Programiz**: https://www.programiz.com/c-programming/online-compiler/
3. **Replit**: https://replit.com/languages/c

Steps:
1. Copy contents of `graph.h` into the compiler
2. Copy contents of `graph.c`, `algorithms.c`, `data.c`, `main.c`
3. Click "Run"

---

**Recommended:** Install TDM-GCC for easiest setup on Windows.
