@echo off
cd /d "%~dp0"
title Bot Telegram Infiltrus - Liberacao de Licencas
cls

echo ============================================================
echo   BOT TELEGRAM INFILTRUS SIGNALS - ATIVACAO AUTOMATICA
echo ============================================================
echo.

if not exist .env (
    echo [AVISO] Arquivo .env nao encontrado!
    echo Criando a partir de .env.example...
    copy .env.example .env >nul
    echo.
    echo Por favor, abra o arquivo .env e cole o seu TELEGRAM_BOT_TOKEN antes de continuar.
    pause
    exit /b
)

echo Iniciando o bot com Victor Torrez...
node bot.js
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] O bot foi encerrado com erro.
    pause
)
