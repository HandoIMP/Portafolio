@echo off

if not exist .git (
    echo No se detecto un repositorio Git en esta carpeta.
    pause
    exit /b 1
)

git add .
git commit -m "Actualiza portfolio"
git push origin main

pause
