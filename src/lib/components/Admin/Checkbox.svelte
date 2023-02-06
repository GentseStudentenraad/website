<script lang="ts">
	export let value: boolean;
	export let label: string;

	export let description: string | null;
</script>

<div>
	{#if description !== undefined}
		<p class="text-[12px] opacity-50 font-semibold uppercase">{description}</p>
	{/if}

	<div class="flex items-center gap-4">
		<label class="switch">
			<input type="checkbox" value="" class="check" bind:checked={value} />
			<span class="slider round" />
		</label>
		<p class="label">{label}</p>
	</div>
</div>

<style>
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 40px;
		height: 20px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 14px;
		width: 14px;
		left: 4px;
		bottom: 3px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #333333;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #333333;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(18px);
		-ms-transform: translateX(18px);
		transform: translateX(18px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 20px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
