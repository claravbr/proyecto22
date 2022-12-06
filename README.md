# Proyecto22
Proyecto de la asignatura Procesos de Ingeniería del Software curso 22-23
Escuela Superior de Ingeniería Informática de Albacete - Universidad de Castilla-La Mancha

## Descripción
Este repositorio contiene la arquitectura base de una solución software estilo SaaS (Software as a Service) de una aplicación genérica que implementa la siguiente funcionalidad:
- Los usuarios inician sesión con nick (no hay clave). El nick es único
- Los usuarios pueden crear partida (sin nombre). Las partidas son de 2 usuarios. El sistema asigna un código a la partida
- Los usuarios puede unirse a partidas disponibles (las que tienen sólo un jugador)
Los usuarios pueden salir de una sesión ya iniciada.
El sistema mantendrá el estado de la sesión de los usuarios que la hayan iniciado.
El sistema actualizará automáticamente una lista de partidas disponibles.
Los usuarios podrán abandonar una partida.
El sistema mostrará un modal cuando se una un segundo jugador a la partida.
Los usuarios tendrán dos tipos de tableros: tableroPropio y tableroRival.
Se exponer la funcionalidad nueva de la capa de lógica (modelo) a través de la capa de WebSockets:
- Los usuarios tendrán una flota compuesta por una colección de barcos (inicialmente dos barcos de tamaños 2 y 4).
- Los usuarios podrán colocar barcos y disparar.

