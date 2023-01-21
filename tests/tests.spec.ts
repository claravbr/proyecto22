import { test, expect } from '@playwright/test';

test('test', async ({ browser }) => {
  const pepeContext = await browser.newContext();
  const luisContext = await browser.newContext();

  //navegador para cada jugador
  const pepepage = await pepeContext.newPage();
  const luispage = await luisContext.newPage();

  // -- PEPE --
  // Inicio de sesión
  await pepepage.goto('http://localhost:3000/');
  await pepepage.getByPlaceholder('Introduce tu nick (max 6 letras)').click();
  await pepepage.getByPlaceholder('Introduce tu nick (max 6 letras)').fill('pepe');
  await pepepage.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Crear partida
  await pepepage.getByRole('button', { name: 'Crear partida' }).click();

  // -- LUIS --
  // Inicio de sesion
  await luispage.goto('http://localhost:3000/');
  await luispage.getByPlaceholder('Introduce tu nick (max 6 letras)').click();
  await luispage.getByPlaceholder('Introduce tu nick (max 6 letras)').fill('luis');
  await luispage.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Unirse a partida
  await luispage.getByRole('link', { name: 'Sala 1 - Propietario: pepe' }).click();
  
  await luispage.getByRole('button', { name: 'Cerrar' }).click();
  await pepepage.getByRole('button', { name: 'Cerrar' }).click();

});