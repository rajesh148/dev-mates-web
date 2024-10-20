export const validateFields = () => {
    if (!firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!age || isNaN(age) || age <= 0) {
      setError('Age must be a valid number greater than 0');
      return false;
    }
    if (!photoUrl.trim() || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(photoUrl)) {
      setError('Please provide a valid image URL');
      return false;
    }
    if (!gender.trim()) {
      setError('Gender is required');
      return false;
    }
    if (!about.trim()) {
      setError('About section cannot be empty');
      return false;
    }
    setError('');
    return true;
  };