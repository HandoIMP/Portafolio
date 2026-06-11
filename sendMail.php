<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];

    $to = "tu-correo@dominio.com"; // cambia por tu correo real
    $subject = "Nuevo mensaje de contacto";
    $body = "Nombre: $nombre\nCorreo: $correo\nTeléfono: $telefono\n\nMensaje:\n$mensaje";
    $headers = "From: $correo";

    if(mail($to, $subject, $body, $headers)) {
        echo "OK";   // importante: texto simple
    } else {
        echo "Error";
    }
}
?>
