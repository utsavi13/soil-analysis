@echo off
echo ========================================
echo Soil Analysis System - Frontend Server
echo ========================================
echo.
echo Starting frontend server...
echo.
echo Frontend will be available at:
echo http://localhost:8080/index.html
echo.
cd "C:\Users\HP\OneDrive\Desktop\Soil_Analysis\frontend"
npx http-server -p 8080
pause
