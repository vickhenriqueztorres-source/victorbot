@echo off
cd /d "%~dp0"
title Reiniciar Servico - Render.com (Bot Infiltrus)
cls
echo ============================================================
echo   REINICIANDO SERVICO NO RENDER.COM
echo ============================================================
echo.
render restart srv-dau1219srm7s73ad6rs0 --confirm
echo.
echo ============================================================
echo   SERVICO REINICIADO COM SUCESSO!
echo ============================================================
pause
