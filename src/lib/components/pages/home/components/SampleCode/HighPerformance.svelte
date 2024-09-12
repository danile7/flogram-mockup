<div
	class="flex flex-col gap-2 w-4/5 md:mx-20 lg:w-1/2 text-white font-code px-1 md:px-8 py-8 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-5 font-thin rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 shadow-xl light:shadow-[#0006] dark:shadow-lg"
	contenteditable="true"
>
	<p>
		<span class="keyword">object</span> <span class="variable">Data</span><span class="symbol"
			>:</span
		>
	</p>
	<div class="indent pl-6">
		<p>
			<span class="variable">value</span><span class="symbol">:</span> <span class="type">I32</span>
		</p>
	</div>
	<p>
		<span class="keyword">fn</span> <span class="variable">process</span><span class="symbol"
			>(</span
		><span class="variable">dataArray</span><span class="symbol">:</span>
		<span class="type">Array</span> <span class="symbol">{`{`}</span> <span class="type">Data</span>
		<span class="symbol">}) -> </span><span class="symbol">(</span><span class="variable"
			>processedArray</span
		><span class="symbol">:</span> <span class="type">Array</span> <span class="symbol">{`{`}</span>
		<span class="type">Data</span><span class="symbol">}):</span>
	</p>
	<div class="indent pl-6">
		<p class="comment">
			# Automatic ownership for objects, optimizing memory without manual effort
		</p>
		<p>
			<span class="keyword">mut</span> <span class="variable">processedArray</span><span
				class="symbol">:</span
			> <span class="type">Array</span> <span class="symbol">{`{`}</span>
			<span class="type">Data</span> <span class="symbol">}(</span><span class="variable">size</span
			> <span class="symbol">=</span> <span class="variable">length</span><span class="symbol"
				>(</span
			><span class="variable">dataArray</span><span class="symbol">)) = []</span>
		</p>
		<p>
			<span class="keyword">foreach</span> <span class="variable">data</span>
			<span class="keyword">in</span> <span class="variable">dataArray</span><span class="symbol"
				>:</span
			>
		</p>
		<div class="indent pl-6">
			<p class="comment"># Copy by value for efficient stack usage, reducing heap allocations</p>
			<p>
				<span class="variable">newValue</span><span class="symbol">:</span>
				<span class="type">I32</span> <span class="symbol">= </span><span class="variable"
					>data.value
				</span><span class="symbol"> *</span>
				<span class="literal"> 2</span>
				<span class="comment"># Simple operation for demonstration</span>
			</p>
			<p>
				<span class="variable">newData</span><span class="symbol">:</span>
				<span class="variable">Data</span> <span class="symbol">=</span>
				<span class="variable">Data</span><span class="symbol">(</span><span class="variable"
					>newValue</span
				><span class="symbol">)</span>
			</p>
			<p>
				<span class="variable">processedArray</span> <span class="symbol">=</span>
				<span class="variable">append</span><span class="symbol">(</span><span class="variable"
					>processedArray</span
				><span class="symbol">,</span> <span class="variable">newData</span><span class="symbol"
					>)</span
				>
			</p>
		</div>
		<p class="comment"># Compiler optimizations on object memory layout for enhanced performance</p>
		<p>
			<span class="keyword">return</span> <span class="variable">processedArray</span>
		</p>
	</div>
</div>

<style>
	* {
		font-weight: 300;
	}
</style>
