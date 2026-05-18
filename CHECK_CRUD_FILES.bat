@echo off
echo ========================================
echo CRUD FILES VERIFICATION
echo ========================================
echo.

cd "C:\Users\HP\OneDrive\Desktop\Soil_Analysis"

echo Checking frontend files...
echo.

if exist "frontend\edit-test.html" (
    echo [OK] edit-test.html exists
) else (
    echo [MISSING] edit-test.html NOT FOUND!
)

if exist "frontend\js\edit-test.js" (
    echo [OK] edit-test.js exists
) else (
    echo [MISSING] edit-test.js NOT FOUND!
)

if exist "frontend\js\reports.js" (
    echo [OK] reports.js exists
) else (
    echo [MISSING] reports.js NOT FOUND!
)

echo.
echo Checking backend files...
echo.

if exist "backend\routes\soilTest.js" (
    echo [OK] soilTest.js exists
) else (
    echo [MISSING] soilTest.js NOT FOUND!
)

echo.
echo ========================================
echo.
echo If all files show [OK], then:
echo 1. Restart backend server (Ctrl+C then npm start)
echo 2. Hard refresh browser (Ctrl+Shift+R)
echo 3. Go to Reports page
echo.
echo ========================================
pause
