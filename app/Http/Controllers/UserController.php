<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('users/page', [
            'data' => User::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('users/form', [
            'user' => new User(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->email_verified_at = $request->has('email_verified_at') ? now() : null;
        try {
            $user->save();
        } catch (\Throwable $th) {
            throw ValidationException::withMessages([
                'message' => 'Something wrong. Please contact administrator for more information.',
            ]);
        }
        return to_route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('users/form', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        if ($request->has('password')) {
            $user->password = Hash::make($request->input('password'));
        }
        if ($request->has('email_verified_at') && strlen(trim($request->input('email_verified_at'))) > 0) {
            if ($user->email_verified_at == null) {
                $user->email_verified_at = now();
            }
        } else {
            $user->email_verified_at = null;
        }
        try {
            $user->save();
        } catch (\Throwable $th) {
            throw ValidationException::withMessages([
                'message' => 'Something wrong. Please contact administrator for more information.',
            ]);
        }
        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        throw ValidationException::withMessages([
            'message' => 'Something wrong. Please contact administrator for more information.',
        ]);
        try {
            $user->delete();
        } catch (\Throwable $th) {
            throw ValidationException::withMessages([
                'message' => 'Something wrong. Please contact administrator for more information.',
            ]);
        }
        return to_route('users.index');
    }
}
