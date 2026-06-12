@echo off
setlocal EnableDelayedExpansion

echo ==========================================
echo Actualizar pagina en GitHub
echo ==========================================

if not exist .git (
    echo No se detecto un repositorio Git en esta carpeta.
    echo Asegurate de ejecutar este archivo desde: %cd%
    pause
    exit /b 1
)

git status --short
echo.
set /p COMMIT_MSG=Ingrese mensaje de commit (presione Enter para usar 'Actualización de página'): 
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Actualización de página

echo.
echo Agregando todos los cambios...
git add .

echo Creando commit...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo No se pudo crear el commit. Revisa el estado de Git arriba.
    pause
    exit /b 1
)

echo Haciendo push al remoto origin en la rama main...
git push origin main
if errorlevel 1 (
    echo Error al subir los cambios a GitHub.
    pause
    exit /b 1
)

echo.
echo Página actualizada correctamente.
pause
