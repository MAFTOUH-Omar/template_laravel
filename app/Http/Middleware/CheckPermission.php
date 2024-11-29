<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next, string $permission): mixed
    {
        $userPermissions = $request->user()
            ? $request->user()->roles()
                ->with('permissions')
                ->get()
                ->pluck('permissions')
                ->flatten()
                ->pluck('title')
                ->unique()
                ->all()
            : [];

        if (!in_array($permission, $userPermissions)) {
            return inertia('Errors/Forbidden', [
                'message' => 'You do not have permission to perform this action.',
            ])->toResponse($request)->setStatusCode(Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
