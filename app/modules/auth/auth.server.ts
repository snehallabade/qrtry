async function handleOTPVerification(request: Request) {
  const formData = await request.formData();
  
  console.log('OTP Verification Attempt:', {
    email: formData.get('email'),
    code: formData.get('code'),
    verificationType: '2fa'
  });
  
  // ... rest of verification logic ...
}