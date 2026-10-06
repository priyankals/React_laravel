Route::get('/bonds', [BondController::class, 'index']);

Route::get('/bonds/{id}', [BondController::class, 'show']);

Route::put('/bonds/{id}', [BondController::class, 'update']);
Route::delete('/bonds/{id}', [BondController::class, 'destroy']);

