import { test, expect } from '@playwright/test';

// Demo accounts seeded on the real MongoDB Atlas database for this check.
const PATIENT = { email: 'demo.patient@example.com', password: 'DemoPass123!' };
const DOCTOR = { email: 'dr.demo@example.com', password: 'DoctorPass123!' };

// Attach console/page-error capture to every test so a silent React crash or a
// stray console.error shows up in the report even when the page "looks" fine.
test.beforeEach(async ({ page }, testInfo) => {
  const issues = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') issues.push(`console.error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => issues.push(`pageerror: ${err.message}`));
  testInfo.issues = issues;
});

test.afterEach(async (_fixtures, testInfo) => {
  if (testInfo.issues?.length) {
    console.log(`\n--- console/page issues during "${testInfo.title}" ---`);
    for (const i of testInfo.issues) console.log(i);
  }
});

// The header's own "Login" button/link and the login form's submit button
// both match a loose getByRole('button', {name: /login/i}) - scope to the form.
async function loginAs(page, { email, password }) {
  await page.goto('/login');
  await page.getByPlaceholder(/enter your email/i).fill(email);
  await page.getByPlaceholder(/^password$/i).fill(password);
  await page.locator('form').getByRole('button', { name: /login/i }).click();
}

async function openDoctorDetails(page) {
  await page.goto('/doctors');
  await page.getByText('Dr Demo').locator('..').getByRole('link').last().click();
  await expect(page).toHaveURL(/\/doctors\/[a-f0-9]+/);
}

test('home page renders hero, about, doctors, faq, testimonials', async ({ page }) => {
  await page.goto('/home');
  await expect(page.getByRole('heading', { name: /we help patient live a healthy life/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /proud to be a part of the community/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /our great doctors/i })).toBeVisible();
  // the fixed DoctorCard/DoctorList/Doctors bugs meant this never rendered before
  await expect(page.getByText('Dr Demo')).toBeVisible();
  await expect(page.getByRole('heading', { name: /most questions by your beloved patients/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /what our patient say/i })).toBeVisible();
});

test('services page renders service cards', async ({ page }) => {
  await page.goto('/services');
  await expect(page.locator('h2').first()).toBeVisible();
});

test('contact page renders the form', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { name: /contact us/i })).toBeVisible();
  await expect(page.getByPlaceholder(/example@gmail.com/i)).toBeVisible();
});

test('doctors list page shows the demo doctor and links to details', async ({ page }) => {
  await page.goto('/doctors');
  await expect(page.getByText('Dr Demo')).toBeVisible();
  await expect(page.getByText('surgeon')).toBeVisible();

  await openDoctorDetails(page);
  await expect(page.getByRole('heading', { name: 'Dr Demo', exact: true })).toBeVisible();
  await expect(page.getByText(/1500/)).toBeVisible();
});

test('doctor details - about and feedback tabs, submit a review', async ({ page }) => {
  await openDoctorDetails(page);

  // About tab (default)
  await expect(page.getByRole('heading', { name: /education/i })).toBeVisible();

  // Feedback tab
  await page.getByRole('button', { name: 'Feedback' }).click();
  await expect(page.getByRole('heading', { name: /all reviews/i })).toBeVisible();

  // log in first - the review endpoint requires a patient token
  await loginAs(page, PATIENT);
  await expect(page).toHaveURL(/\/home/);

  await openDoctorDetails(page);
  await page.getByRole('button', { name: 'Feedback' }).click();
  await page.getByRole('button', { name: /give feedback/i }).click();

  const stars = page.locator('form button[type="button"]');
  await stars.nth(4).click(); // 5-star rating
  await page.getByPlaceholder(/write your feedback here/i).fill('Playwright smoke test review.');
  await page.getByRole('button', { name: /submit feedback/i }).click();

  await expect(page.getByText(/successfully created a review/i)).toBeVisible({ timeout: 10000 });
});

test('register page - shows a validation error for a duplicate email', async ({ page }) => {
  await page.goto('/register');
  await page.getByPlaceholder(/full name/i).fill('Duplicate Demo');
  await page.getByPlaceholder(/enter your email/i).fill(PATIENT.email); // already registered
  await page.getByPlaceholder(/password/i).fill('Whatever123!'); // signup's placeholder has a leading space
  await page.getByRole('button', { name: /sign up/i }).click();
  await expect(page.getByText(/already exists/i)).toBeVisible({ timeout: 10000 });
});

test('login page - wrong password shows an error toast', async ({ page }) => {
  await loginAs(page, { email: PATIENT.email, password: 'WrongPassword!' });
  await expect(page.getByText(/incorrect password/i)).toBeVisible({ timeout: 10000 });
});

test('patient dashboard - bookings and profile settings tabs', async ({ page }) => {
  await loginAs(page, PATIENT);
  await expect(page).toHaveURL(/\/home/);

  await page.goto('/users/profile/me');
  // My bookings tab (default) - this is DoctorCard rendering again, now fixed
  await expect(page.getByText('Dr Demo')).toBeVisible();

  await page.getByRole('button', { name: /profile settings/i }).click();
  await expect(page.getByPlaceholder(/full name/i)).toHaveValue('Demo Patient');
  await expect(page.getByPlaceholder(/enter your email/i)).toHaveValue(PATIENT.email);

  // save without touching the password field - this used to wipe the password hash
  await page.getByRole('button', { name: /^update$/i }).click();
  await expect(page.getByText(/user is registered/i)).toBeVisible({ timeout: 10000 });
});

test('doctor dashboard - overview, appointments, profile tabs', async ({ page }) => {
  await loginAs(page, DOCTOR);
  await expect(page).toHaveURL(/\/home/);

  await page.goto('/doctors/profile/me');
  await expect(page.getByRole('heading', { name: 'Dr Demo', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Appointments' }).click();
  // this is the Booking.user populate fix - was blank before
  await expect(page.getByText('Demo Patient')).toBeVisible();
  await expect(page.getByText('demo.patient@example.com')).toBeVisible();

  await page.getByRole('button', { name: 'Profile' }).click();
  await expect(page.getByPlaceholder(/full name/i)).toHaveValue('Dr Demo');
  await page.getByRole('button', { name: /update profile/i }).click();
  await expect(page.getByText(/profile updated successfully/i)).toBeVisible({ timeout: 10000 });
});

test('header shows login button when logged out and avatar link when logged in', async ({ page }) => {
  await page.goto('/home');
  await expect(page.getByRole('link', { name: /login/i })).toBeVisible();

  await loginAs(page, PATIENT);
  await expect(page).toHaveURL(/\/home/);

  await expect(page.locator('header a[href="/users/profile/me"]')).toBeVisible();
});
