<script lang='ts'>
    import Avatar from 'svelte-boring-avatars';
    import {field, form} from 'svelte-forms';
    import {required} from 'svelte-forms/validators';
    import toast from 'svelte-french-toast';
    import {goto} from '$app/navigation';
    import AccessCard from '$lib/components/pages/repo/AccessCard.svelte';
    import FormErrorMessage from '$lib/components/core/FormErrorMessage.svelte';
    import Divider from '$lib/components/core/Divider.svelte';
    import Checkbox from '$lib/components/core/Checkbox.svelte';
    import themeStore from '$lib/store/theme';
    import authStore from '$lib/store/auth';
    import AppButton from '$lib/components/core/AppButton.svelte';
    import AppTextField from '$lib/components/core/AppTextField.svelte';
    import {createLibrary} from '$lib/services/repo.service';
    import ClarityLibrarySolid from '~icons/clarity/library-solid';
    import MaterialSymbolsDescription from '~icons/material-symbols/description';
    import MaterialSymbolsInfo from '~icons/material-symbols/info';
    import MaterialSymbolsAdd from '~icons/material-symbols/add';
    import UilBookAlt from '~icons/uil/book-alt';
    import MaterialSymbolsLock from '~icons/material-symbols/lock';

    export let data;

    let isPublic = true;
    let isAddReadme = false;
    let isLoading = false;
    $: mode = $themeStore.mode;
    $: user = $authStore.user;


    const checkLibraryNameHasSpaces = () => {
        return async (libraryName: string) => {
            return {valid: libraryName.indexOf(' ') < 0, name: 'contain_space'};
        };
    };

    const libraryNameF = field('libraryName', '', [required(), checkLibraryNameHasSpaces()]);
    const libraryDescription = field('libraryDescription', '', []);

    const LibraryCreateForm = form(libraryNameF, libraryDescription);

    const handleCreate = async () => {

        await libraryNameF.validate();

        if ($LibraryCreateForm.valid) {
            try {
                isLoading = true;

                const library = {
                    name: $libraryNameF.value,
                    description: $libraryDescription.value,
                    isPublic: isPublic,
                    ownerId: user?.userId,
                    addReadme: isAddReadme
                };

                const response = await createLibrary({library, authHeader: data.authHeader});
                toast.success('Create Success!');
                await goto('/app/repo');
            } catch (e) {
                console.log('error during creating project', e);
            } finally {
                isLoading = false;
            }
        } else {
            toast.error('check  your input fields.');
        }
    };
</script>

<div
        class='absolute w-screen h-screen flex-grow overflow-y-auto overflow-x-hidden flex justify-center items-center bg-white dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 text-base transition-all duration-150'
>
    <div class='flex flex-col gap-2'>
        <!-- Head -->
        <div class='flex flex-col gap-2'>
            <div class='text-xl font-bold'>Create new Project</div>

            <p class='flex'>
                A library contains all flo files and modules. Please upload your flo library file.
            </p>
        </div>

        <Divider/>

        <!-- Library name -->
        <div class='flex py-2'>
            <div class='flex flex-col gap-2'>
                <span class=''>Owner *</span>
                <div
                        class='mt-[2px] flex h-10 items-center gap-2 bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 px-2 rounded-sm'
                >
                    <Avatar
                            name='Maria Mitchell'
                            variant='bauhaus'
                            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                            size={20}
                    />
                    <span>{user && user.username.toLowerCase()}</span>
                </div>
            </div>
            <div class='mt-9 ml-2 mr-2 text-2xl'>/</div>
            <div class='flex-grow flex flex-col gap-1'>
                <span class=''>Library name *</span>

                <AppTextField
                        bind:value={$libraryNameF.value}
                        type='text'
                        name='library'
                        disabled={isLoading}
                        isLoading={isLoading}
                        invalid={!$LibraryCreateForm.valid}
                        placeholder='library-1'
                        leftIcon={ClarityLibrarySolid}
                />


                {#if !$LibraryCreateForm.valid}
                    {#if $LibraryCreateForm.hasError('libraryName.required')}
                        <FormErrorMessage>Name is required</FormErrorMessage>
                    {/if}
                    {#if $LibraryCreateForm.hasError('libraryName.contain_space')}
                        <FormErrorMessage>Library name must not contain any spaces</FormErrorMessage>
                    {/if}
                {/if}
            </div>
        </div>

        <!-- Library description -->
        <div class='flex flex-col gap-2 py-2'>

            <AppTextField
                    bind:value={$libraryDescription.value}
                    label={"Description (optional)"}
                    placeholder='Type Project Description Here...'
                    leftIcon={MaterialSymbolsDescription}
            />
        </div>

        <Divider/>

        <!-- Access -->
        <div class='flex flex-col gap-2'>
            <AccessCard
                    icon = {UilBookAlt}
                    title='Public'
                    description='Anyone on the internet can see this repository. You choose who can commit.'
                    isCheck={isPublic}
                    handleClick={() => (isPublic = true)}
            />
            <AccessCard
                    icon = {MaterialSymbolsLock}
                    title='Private'
                    description='You choose who can see and commit to this repository.'
                    isCheck={!isPublic}
                    handleClick={() => (isPublic = false)}
            />
        </div>

        <Divider/>

        <!-- Readme file -->
        <div class='flex flex-col gap-2 py-2'>
            <Checkbox bind:value={isAddReadme} colorScheme={mode === 'light' ? 'black' : 'gray'}
            >Add a readme file
            </Checkbox>
            <span class='indent-6'>This is where you can write a long description for your project.</span>
        </div>

        <Divider/>

        <!-- info -->
        <div class='flex items-center gap-2'>
            <MaterialSymbolsInfo/>
            <span class='py-2'>You are creating a {isPublic ? 'public' : 'private'} library in your work space.</span>
        </div>

        <Divider/>

        <div class='flex gap-2'>
            <AppButton variant='primary-outlined' handleClick={() =>  handleCreate() } isLoading={isLoading}>
                <div class='flex items-center justify-between w-full'>
                    <MaterialSymbolsAdd/>
                    <span>Create Library</span>
                </div>
            </AppButton>

            {#if !isLoading}
                <AppButton variant='danger-outlined' handleClick={() => goto('/app/repo')}>Cancel</AppButton>
            {/if}

        </div>
    </div>
</div>
