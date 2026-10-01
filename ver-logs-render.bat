@echo off
cd /d "%~dp0"
title Logs ao Vivo - Render.com (Bot Infiltrus)
cls
echo ============================================================
echo   STREAMING DE LOGS AO VIVO DO RENDER (BOT INFILTRUS)
echo ============================================================
echo Pressione Ctrl+C para encerrar o monitoramento.
echo.
render logs -r srv-dau1219srm7s73ad6rs0 --tail
pause
