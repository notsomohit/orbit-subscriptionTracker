export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
<div style="
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f4f7fa;
">

  <table
    cellpadding="0"
    cellspacing="0"
    border="0"
    width="100%"
    style="
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    "
  >

    <!-- HEADER -->
    <tr>
      <td
        style="
          background-color: #4a90e2;
          text-align: center;
          padding: 25px;
        "
      >
        <p
          style="
            font-size: 42px;
            font-weight: 800;
            color: white;
            margin: 0;
          "
        >
          Orbit
        </p>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td style="padding: 40px 30px;">

        <p style="font-size: 16px; margin-bottom: 25px;">
          Hello
          <strong style="color: #4a90e2;">
            ${userName}
          </strong>,
        </p>

        <p style="font-size: 16px; margin-bottom: 25px;">
          Your
          <strong>${subscriptionName}</strong>
          subscription is set to renew on

          <strong style="color: #4a90e2;">
            ${renewalDate}
          </strong>

          (${daysLeft} day${daysLeft > 1 ? "s" : ""} from today).
        </p>

        <!-- DETAILS -->
        <table
          cellpadding="15"
          cellspacing="0"
          border="0"
          width="100%"
          style="
            background-color: #f0f7ff;
            border-radius: 10px;
            margin-bottom: 25px;
          "
        >

          <tr>
            <td
              style="
                font-size: 16px;
                border-bottom: 1px solid #d0e3ff;
              "
            >
              <strong>Plan:</strong> ${planName}
            </td>
          </tr>

          <tr>
            <td
              style="
                font-size: 16px;
                border-bottom: 1px solid #d0e3ff;
              "
            >
              <strong>Price:</strong> ₹${price}
            </td>
          </tr>

          <tr>
            <td style="font-size: 16px;">
              <strong>Payment Method:</strong> ${paymentMethod}
            </td>
          </tr>

        </table>

        <!-- ACCOUNT SETTINGS -->
        <p style="font-size: 16px; margin-bottom: 25px;">
          If you'd like to make changes or cancel your subscription,
          visit your

          <a
            href="${accountSettingsLink}"
            style="
              color: #4a90e2;
              text-decoration: none;
              font-weight: 600;
            "
          >
            account settings
          </a>

          before the renewal date.
        </p>

        <!-- SUPPORT -->
        <p style="font-size: 16px; margin-top: 30px;">
          Need help?

          <a
            href="${supportLink}"
            style="
              color: #4a90e2;
              text-decoration: none;
              font-weight: 600;
            "
          >
            Contact Support
          </a>
        </p>

        <!-- FOOTER -->
        <p style="font-size: 16px; margin-top: 35px;">
          Best regards,<br />
          <strong>The Orbit Team</strong>
        </p>

      </td>
    </tr>

    <!-- BOTTOM -->
    <tr>
      <td
        style="
          background-color: #f0f7ff;
          padding: 20px;
          text-align: center;
          font-size: 14px;
        "
      >

        <p style="margin: 0 0 10px;">
          © 2026 Orbit. All rights reserved.
        </p>

        <p style="margin: 0;">

          <a
            href="${accountSettingsLink}"
            style="
              color: #4a90e2;
              text-decoration: none;
              margin: 0 10px;
            "
          >
            Manage Subscription
          </a>

          |

          <a
            href="${supportLink}"
            style="
              color: #4a90e2;
              text-decoration: none;
              margin: 0 10px;
            "
          >
            Support
          </a>

        </p>

      </td>
    </tr>

  </table>
</div>
`;



export const emailTemplates = [
  {
    label: "7 days before reminder",

    generateSubject: (data) =>
      `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,

    generateBody: (data) =>
      generateEmailTemplate({
        ...data,
        daysLeft: 7,
      }),
  },

  {
    label: "5 days before reminder",

    generateSubject: (data) =>
      `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,

    generateBody: (data) =>
      generateEmailTemplate({
        ...data,
        daysLeft: 5,
      }),
  },

  {
    label: "2 days before reminder",

    generateSubject: (data) =>
      `🚀 2 Days Left! ${data.subscriptionName} Subscription Renewal`,

    generateBody: (data) =>
      generateEmailTemplate({
        ...data,
        daysLeft: 2,
      }),
  },

  {
    label: "1 day before reminder",

    generateSubject: (data) =>
      `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,

    generateBody: (data) =>
      generateEmailTemplate({
        ...data,
        daysLeft: 1,
      }),
  },

];