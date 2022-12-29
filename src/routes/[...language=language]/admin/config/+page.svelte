<script lang="ts">
  import ColorPicker from 'svelte-awesome-color-picker';
  import type {PageData} from './$types';
	import TextField from "$lib/components/Admin/TextField.svelte";
	import ActionButton from "$lib/components/Admin/ActionButton.svelte";

  export let data: PageData;

	async function post() {
		const res = await fetch('/admin/config', {
			method: 'POST',
			body: JSON.stringify(data.configuration),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.status === 200) {
			window.location.href = '/admin';
		} else {
			console.log(res);
		}
	}
</script>

<svelte:head>
	<style>
		:root {
			@apply bg-neutral-100;
		}
	</style>
</svelte:head>

<div class="py-12">
	<div class="container space-y-2 py-12">
		<div class="flex items-center text-xl font-bold gap-1 child:opacity-75">
			<a href="/admin">admin</a>
			<p>/</p>
			<p>siteconfiguratie</p>
		</div>

		<div class="grid grid-cols-2 gap-12">
			<div class="space-y-2">
				<p class="font-medium">Opties</p>
				<div class="flex items-center gap-4">
					<input
						id="default-checkbox"
						type="checkbox"
						value=""
						class="check"
						bind:checked={data.configuration.active}
					/>
					<label for="default-checkbox">Actief</label>
				</div>

				<div class="flex items-center gap-4">
					<input
						id="default-checkbox"
						type="checkbox"
						value=""
						class="check"
						bind:checked={data.configuration.news_section}
					/>
					<label for="default-checkbox">Nieuws</label>
				</div>

				<div class="flex items-center gap-4">
					<input
						id="default-checkbox"
						type="checkbox"
						value=""
						class="check"
						bind:checked={data.configuration.who_section}
					/>
					<label for="default-checkbox">Wie</label>
				</div>
				<div class="flex items-center gap-4">
					<input
						id="default-checkbox"
						type="checkbox"
						value=""
						class="check"
						bind:checked={data.configuration.faq_section}
					/>
					<label for="default-checkbox">FAQ</label>
				</div>
				<div class="flex items-center gap-4">
					<input
						id="default-checkbox"
						type="checkbox"
						value=""
						class="check"
						bind:checked={data.configuration.opinions_section}
					/>
					<label for="default-checkbox">Standpunten</label>
				</div>
				<div class="flex items-center gap-4">
					<input
						id="default-checkbox"
						type="checkbox"
						value=""
						class="check"
						bind:checked={data.configuration.i18n}
					/>
					<label for="default-checkbox">Engelse versie</label>
				</div>
			</div>

			<div class="space-y-2">
				<p class="font-medium">Stijl</p>
				<div>
					<ColorPicker
						bind:hex={data.configuration.brand_color_primary}
						label="Primaire kleur ({data.configuration.brand_color_primary})"
					/>
				</div>
				<div>
					<ColorPicker
						bind:hex={data.configuration.brand_color_secondary}
						label="Secundaire kleur ({data.configuration.brand_color_secondary})"
					/>
				</div>
			</div>

			<div>
				<p class="font-medium">Contactgegevens</p>
				<TextField
								placeholder="Straatnaam 1, 9000 Gent"
								bind:value={data.configuration.adres}
								description="Adres"
				/>
				<TextField
								placeholder="091234567"
								bind:value={data.configuration.phone}
								description="Telefoonnummer"
				/>
			</div>

			<div>
				<p class="font-medium">Sociale Media</p>
				<TextField
					placeholder="https://facebook.com"
					bind:value={data.configuration.facebook_url}
					description="Facebook"
				/>

				<TextField
								placeholder="https://twitter.com"
								bind:value={data.configuration.twitter_url}
								description="Twitter"
				/>

				<TextField
								placeholder="https://instagram.com"
								bind:value={data.configuration.instagram_url}
								description="Instagram"
				/>
			</div>

			<ActionButton
				action={post}
				color={data.configuration.brand_color_primary}
			/>
		</div>
	</div>

	<div class="grow" />
</div>

<style>
	.check {
		@apply w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600;
	}
</style>
