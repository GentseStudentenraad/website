# Gekende problemen



### i18n

#### Probleem

Bij het selecteren van een andere taal ververst de pagina niet.

#### Oorzaak

Wanneer `src/hooks.server.ts` de parameters analyseert (en zo vermijdt dat dit in elke `load` functie moet gebeuren) zal SvelteKit de gewijzigde waarde niet doorpropageren bij het wisselen van taal.

#### Oplossing

In elke individuele `load` functies moet een dummy variabele aangemaakt worden die de waarde van de parameter uitleest.

```typescript
export async function load({ params, url, locals }) {
	const _ = params.language // BUGFIX

	return {
		translations: locals.language === Language.DUTCH ? dutch : english,
	};
}
```
