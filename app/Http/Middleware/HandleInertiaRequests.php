<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    // public function share(Request $request): array
    // {
    //     $user = $request->user();

    //     return [
    //         ...parent::share($request),
    //         'auth' => [
    //             'user' => $user,
    //         ],
    //         'permissions' => $user ? $user->roles()
    //             ->with('permissions')
    //             ->get()
    //             ->pluck('permissions')
    //             ->flatten()
    //             ->pluck('title')
    //             ->unique()
    //             ->all() : [],
            
    //     ];
    // }


    public function share(Request $request): array
    {
        $user = $request->user();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
            ],
            'permissions' => $user ? $user->roles()
                ->with('permissions')
                ->get()
                ->pluck('permissions')
                ->flatten()
                ->pluck('title')
                ->unique()
                ->all() : [],
            'locale' => app()->getLocale(),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }
}
