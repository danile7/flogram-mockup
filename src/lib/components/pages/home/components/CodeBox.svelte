<div
	class="flex flex-col w-full md:w-[500px] border-2 border-primary dark:border-gray-200 text-white font-code px-4 py-4 bg-primary"
>
	<p>
		<span class="keyword">fn</span> <span class="variable">main</span><span class="symbol"
			>() -> (</span
		><span class="variable">f</span><span class="symbol">:</span>
		<span class="type">I32</span><span class="symbol">):</span>
	</p>
	<div class="indent">
		<p>
			<span class="variable">n</span> <span class="symbol">:=</span>
			<span class="literal">10</span>
		</p>
		<p>
			<span class="keyword">mut</span> <span class="variable">a</span><span class="symbol">:</span>
			<span class="type">I32</span> <span class="symbol">=</span> <span class="literal">0</span>
		</p>
		<p>
			<span class="keyword">mut</span> <span class="variable">b</span><span class="symbol">:</span>
			<span class="type">I32</span> <span class="symbol">=</span> <span class="literal">1</span>
		</p>
		<p>
			<span class="keyword">mut</span> <span class="variable">i</span><span class="symbol">:</span>
			<span class="type">I32</span> <span class="symbol">=</span> <span class="literal">0</span>
		</p>
		<p><span class="keyword">loop</span><span class="symbol">:</span></p>
		<div class="indent">
			<p>
				<span class="variable">temp</span><span class="symbol">:</span>
				<span class="type">I32</span>
				<span class="symbol">=</span> <span class="variable">a</span>
			</p>
			<p>
				<span class="keyword">if</span> <span class="variable">{`>`}=</span><span class="symbol"
					>(</span
				><span class="variable">i</span><span class="symbol">,</span><span class="variable">n</span
				><span class="symbol" /><span class="symbol">):</span>
			</p>
			<div class="indent">
				<p><span class="keyword">break</span></p>
			</div>
			<p>
				<span class="variable">a</span> <span class="symbol">=</span>
				<span class="variable">b</span>
			</p>
			<p>
				<span class="variable">b</span> <span class="symbol">=</span>
				<span class="variable">+</span><span class="symbol">(</span><span class="variable"
					>temp</span
				><span class="symbol">,</span><span class="variable">b</span><span class="symbol">)</span>
			</p>
			<p>
				<span class="variable">i</span> <span class="symbol">=</span>
				<span class="variable">+</span><span class="symbol">(</span><span class="variable">i</span
				><span class="symbol">,</span> <span class="literal">1</span><span class="symbol">)</span>
			</p>
		</div>
		<p><span class="keyword">return</span> <span class="variable">a</span></p>
	</div>
</div>
