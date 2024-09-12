<div
	class="flex flex-col gap-2 w-4/5 md:mx-20 lg:w-1/2 text-white font-code px-1 md:px-8 py-8 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-5 font-thin rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 shadow-xl light:shadow-[#0006] dark:shadow-lg"
	contenteditable="true"
>
	<p class="comment">
		# Example demonstrating Flogram's full stack capabilities with server and file interaction
	</p>
	<p>
		<span class="keyword">server</span> <span class="variable">AI_ProcessingServer</span><span
			class="symbol">:</span
		>
	</p>
	<div class="indent pl-6">
		<p>
			<span class="keyword">fn</span> <span class="variable">process_data</span><span class="symbol"
				>(</span
			><span class="variable">file_link</span><span class="symbol">:</span>
			<span class="type">Link</span> <span class="symbol">{`{`}</span>
			<span class="type">File</span><span class="symbol">,</span> <span class="type">heap</span>
			<span class="symbol">}) -></span> <span class="symbol">(</span><span class="variable"
				>processed_data</span
			><span class="symbol">:</span> <span class="type">String</span><span class="symbol">):</span>
		</p>
		<div class="indent pl-6">
			<p>
				<span class="variable">raw_data</span> <span class="symbol">:=</span>
				<span class="variable">file_link.read</span><span class="symbol">()</span>
			</p>
			<p>
				<span class="keyword">return</span> <span class="variable">AI_analyze</span><span
					class="symbol">(</span
				><span class="variable">raw_data</span><span class="symbol">)</span>
			</p>
		</div>
	</div>
	<p>
		<span class="keyword">fn</span> <span class="variable">main</span><span class="symbol">():</span
		>
	</p>
	<div class="indent pl-6">
		<p class="comment"># Create server instance that runs locally</p>
		<p>
			<span class="variable">server</span> <span class="symbol">:=</span>
			<span class="variable">AI_ProcessingServer</span><span class="symbol">()</span>
		</p>
		<p class="comment">
			# If you wanted to run it on an actual server you would add:
			<br />
			# link_to_server(server, “www.ai_processing.com”)
		</p>
		<p class="comment"># Link to a specific file</p>
		<p>
			<span class="variable">data_file</span> <span class="symbol">:=</span>
			<span class="type">File</span><span class="symbol">(</span><span class="literal"
				>"data.txt"</span
			><span class="symbol">)</span>
			<br />
			<span class="variable">link_to_file</span><span class="symbol">(</span><span class="variable"
				>data_file</span
			><span class="symbol">,</span> <span class="literal">"/path/to/data.txt"</span><span
				class="symbol">)</span
			>
		</p>
		<p class="comment"># Process data from file using server</p>
		<p>
			<span class="variable">processed_data</span> <span class="symbol">:=</span>
			<span class="variable">server.process_data</span><span class="symbol">(</span><span
				class="variable">data_file</span
			><span class="symbol">)</span>
		</p>
		<p class="comment"># Display the processed data</p>
		<p>
			<span class="variable">draw</span><span class="symbol">(</span><span class="variable"
				>processed_data</span
			><span class="symbol">)</span>
		</p>
	</div>
</div>

<style>
	* {
		font-weight: 300;
	}
</style>
