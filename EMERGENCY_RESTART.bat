@echo off
echo ========================================
echo EMERGENCY CRUD FIX
echo ========================================
echo.
echo This will restart your backend server
echo.
echo STEP 1: Close the backend PowerShell window manually
echo        (The one showing "Server is running on port 3000")
echo.
pause
echo.
echo STEP 2: Starting backend in NEW window...
echo.
cd "C:\Users\HP\OneDrive\Desktop\Soil_Analysis\backend"
start cmd /k "npm start"
echo.
echo Backend starting in new window...
echo Wait for "Server is running on port 3000"
echo.
echo STEP 3: Now do this in your browser:
echo    1. Press Ctrl + Shift + R (hard refresh)
echo    2. Go to Reports page
echo    3. You should see Edit and Delete buttons!
echo.
pause
