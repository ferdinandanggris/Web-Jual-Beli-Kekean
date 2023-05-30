<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet">


    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>KEKEAN Wastra Gallery</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    {{-- @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
</head>

<body>
    <div class="jangan dibuka">
        <div >
            <div>
                <div>
                    
                </div>
            </div>
        </div>
    </div>
    <script src="https://app.sandbox.midtrans.com/snap/snap.js"></script>
    <div id="app"></div>
    <script src="/js/app.js"></script>
    <script type='module' src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
</body>

</html>