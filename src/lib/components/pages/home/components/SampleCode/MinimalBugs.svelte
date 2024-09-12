<div
	class="flex flex-col gap-2 w-4/5 md:mx-20 lg:w-1/2 text-white font-code px-1 md:px-8 py-8 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 font-thin rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 shadow-xl light:shadow-[#0006] dark:shadow-lg backdrop-blur-sm"
	contenteditable="true"
>
	<p>
		<span class="keyword">server</span> <span class="variable">BackendServer</span><span
			class="symbol">:</span
		>
	</p>
	<div class="indent">
		<p class="comment">
			# Backend function for data processing. Type safety and memory safety are ensured.
		</p>
		<p>
			<span class="keyword">fn</span> <span class="variable">processData</span><span class="symbol"
				>(</span
			><span class="variable">data</span><span class="symbol">:</span>
			<span class="type">Array</span> <span class="symbol">{`{`}</span>
			<span class="type">I32</span> <span class="symbol">})</span> <span class="symbol">-></span>
			<span class="symbol">(</span><span class="variable">result</span><span class="symbol">:</span>
			<span class="type">Array</span> <span class="symbol">{`{`}</span>
			<span class="type">I32</span><span class="symbol">}):</span>
		</p>
		<div class="indent">
			<p class="comment"># Processing data...</p>
			<p>
				<span class="keyword">return</span> <span class="variable">sorted</span><span class="symbol"
					>(</span
				><span class="variable">data</span><span class="symbol">)</span>
			</p>
		</div>
	</div>
	<p>
		<span class="keyword">fn</span> <span class="variable">main</span><span class="symbol">():</span
		>
	</p>
	<div class="indent pl-6">
		<p class="comment">
			# Frontend data initialization. Immutable by default, preventing shared state bugs.
		</p>
		<p>
			<span class="variable">frontendData</span> <span class="symbol">:=</span>
			<span class="symbol">[</span><span class="literal">5</span><span class="symbol">,</span>
			<span class="literal">2</span><span class="symbol">,</span>
			<span class="literal">8</span><span class="symbol">,</span>
			<span class="literal">1</span><span class="symbol">]</span>
		</p>
		<p class="comment"># Connect to the server.</p>
		<p>
			<span class="variable">link_to_server</span><span class="symbol">(</span><span
				class="variable">backend_server</span
			><span class="symbol">,</span> <span class="literal">backend.flogram.dev</span><span
				class="symbol">)</span
			>
		</p>
		<p class="comment">
			# Safe cross-language operation. Compile-time checks prevent threading and memory safety
			issues.
		</p>
		<p>
			<span class="variable">processedData</span> <span class="symbol">:=</span>
			<span class="variable">backend_server.processData</span><span class="symbol">(</span><span
				class="variable">frontendData</span
			><span class="symbol">)</span>
		</p>
		<p class="comment">
			# Display processed data. Each iteration is isolated, avoiding threading issues.
		</p>
		<p>
			<span class="keyword">foreach</span> <span class="variable">value</span>
			<span class="keyword">at</span> <span class="variable">index</span>
			<span class="keyword">in</span> <span class="variable">processedData</span><span
				class="symbol">:</span
			>
		</p>
		<div class="indent pl-6">
			<p>
				<span class="variable">display</span><span class="symbol">(</span><span class="variable"
					>value</span
				><span class="symbol">)</span>
			</p>
		</div>
	</div>
</div>

<style>
	* {
		font-weight: 300;
	}
</style>
