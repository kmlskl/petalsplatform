import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import formstyles from "../../styles/forms.module.css";
import { changePassword } from "../../services/auth"; // This is a hypothetical function
import ErrorField from "../../components/ErrorField";

const action = async ({ request }) => {
  const formData = await request.formData();
  const { currentPassword, newPassword } = Object.fromEntries(formData);

  if (!currentPassword) {
    return {
      error: { currentPassword: "You must provide your current password" },
    };
  }

  if (!newPassword) {
    return {
      error: { newPassword: "You must provide a new password" },
    };
  }

  try {
    await changePassword(currentPassword, newPassword);
  } catch (error) {
    return {
      error: { general: error.message },
    };
  }

  return redirect("/auth/profile");
};

const ChangePassword = () => {
  let navigation = useNavigation();
  let isChanging = navigation.formData?.get("currentPassword") != null;

  let actionData = useActionData();

  return (
    <section>
      <hgroup className={formstyles.header}>
        <h2>Change Password</h2>
        <p>Ensure your account is secure by updating your password</p>
      </hgroup>
      <Form method="post">
        <div className={formstyles.formGroup}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="Current Password"
            autoComplete="current-password"
          />
          <ErrorField data={actionData} field="currentPassword" />
        </div>
        <div className={formstyles.formGroup}>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            autoComplete="new-password"
          />
          <ErrorField data={actionData} field="newPassword" />
        </div>
        <div className={formstyles.formGroup}>
          <ErrorField data={actionData} field="general" />
          <button
            type="submit"
            disabled={isChanging}
            className={actionData && actionData.error ? formstyles.shake : null}
          >
            {isChanging ? "Changing password..." : "Change Password"}
          </button>
        </div>
      </Form>
    </section>
  );
};

ChangePassword.action = action;

export default ChangePassword;
