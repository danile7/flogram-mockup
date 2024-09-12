<script lang='ts'>
	import CodeMirror from '../web-ide/CodeMirror.svelte';

	const tabs = [
		{
			title: 'Fibonacci',
			code: `fn fibonacci(n: I32) -> (f: I32):
  mut a: I32 = 0
  mut b: I32 = 1
  mut i: I32 = 0
  loop:
    temp: I32 = a
    if >=(i,n):
      break
    a = b
    b = +(temp,b)
    i = +(i, 1)
  return a`
		},
		{
			title: 'Bubble Sort',
			code: `fn sort(array: Array { I32 }, length: I32) -> (c: Array { I32 } ):
  mut index:= 0

  loop:
    if >=(index, length):
      break
    inner_end:= -(length, index)
    mut j:= 0
    loop:
      next_j:= +(j, 1)  # Compute next_j in each iteration of the inner loop
      if >=(j, inner_end):
        break
      if >(array[j], array[next_j]):
        temp:= array[j]
        array[j] = array[next_j]
        array[next_j] = temp
      j = +(j, 1)
    index = +(index, 1)

  return array`
		},
		{
			title: 'Type Inference',
			code: `object Point:
  x: FP32
  y: I32

fn identity():
  inferred:= [-10, 40, 80, 100]
  infer:= inferred
  p:=  Point(x = 10, y = 11)
`
		},
		{
			title: 'Objects',
			code: `object Point:
  x: FP32
  y: I32

object Circle:
  radius: FP32
  link: Link { FP32, heap }
  point: Point


  # Note: self.radius equals radius that belongs to the object
  # radius is the parameter that's passed in
  fn setLinkValue(a: FP32) -> ():
    at(self.link) = a
    return
  
  fn getLinkValue() -> (k: FP32):
    name: FP32 = at(self.link)
    return name

  fn getValueLink() -> (a: Link { FP32, heap}):
    result: Link { FP32, heap} = Link(self.radius)
    return result

  fn getRadius() -> (radius: FP32):
    return self.radius

  fn setRadius(radius: FP32) -> ():
    self.radius = radius
    # return

  fn calculateArea() -> (result: FP32):
    area: FP32 = *(*(self.radius,self.radius), 3.14)
    return area
  
  fn assignPoints() -> ():
    self.point.x = 10.2
    self.point.y = 10
    return`
		}
	];

	// Set initial tab to be displayed
	let activeTab = tabs[0];

	// Function to handle tab click
	const handleTabClick = (tab) => {
		activeTab = tab;
	};
</script>

<div class='dark:bg-gray-800 dark:text-gray-100 bg-gray-100 px-4 py-5 flex flex-col gap-10'>
	<h3 class='text-center text-3xl font-nunito dark:text-primary-teal font-bold'>Examples</h3>
	<div class='container mx-auto'>
		<div class='flex flex-col md:flex-row'>
			<div class='w-full md:w-1/4'>
				<ul class='flex flex-col'>
					{#each tabs as tab}
						<li class='flex flex-col'>
							<button
								class={`flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-transparent dark:text-gray-100 ${
									activeTab === tab ? 'dark:bg-gray-700 bg-white' : 'dark:bg-gray-800 bg-gray-50'
								} dark:hover:bg-gray-700 hover:bg-white focus:outline-none focus:shadow-outline-gray`}
								on:click={() => handleTabClick(tab)}
							>
								{tab.title}
							</button>
						</li>
					{/each}
				</ul>
			</div>
			<div class='w-full md:w-3/4'>
				<div class='p-4 dark:bg-gray-800 bg-slate-100'>
					<CodeMirror value={activeTab.code} />
				</div>
			</div>
		</div>
	</div>
</div>
