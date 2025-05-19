async function handleOTPVerification(request: Request) {
  try {
    const formData = await request.formData();
    
    console.log('OTP Verification Attempt:', {
      email: formData.get('email'),
      code: formData.get('code'),
      verificationType: '2fa'
    });

    // Add actual verification logic
    const isValid = await verifyOTP(
      formData.get('email')?.toString(),
      formData.get('code')?.toString()
    );

    if (!isValid) {
      throw new ShelfError({
        cause: null,
        message: 'Invalid OTP code',
        status: 401,
        label: 'Authentication'
      });
    }

    return json({ success: true });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    
    if (error instanceof ShelfError) {
      return json({
        error: error.message,
        status: error.status
      }, { status: error.status });
    }

    return json({
      error: 'Internal server error',
      status: 500
    }, { status: 500 });
  }
}