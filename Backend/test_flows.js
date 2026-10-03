

const BASE_URL = 'http://localhost:4000';

async function runTests() {
    console.log("Starting backend endpoint tests...");

    // 1. Admin login to test organization approval
    console.log("\\n--- Testing Admin Workflow ---");
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin@crewup.org', password: 'gugugaga' })
    });

    if (!adminLoginRes.ok) {
        const txt = await adminLoginRes.text();
        console.error("Admin login error:", txt);
        throw new Error("Admin login failed");
    }
    const adminCookie = adminLoginRes.headers.get('set-cookie');
    console.log("Admin login successful!");

    // Get all organizations
    const orgsRes = await fetch(`${BASE_URL}/api/organizations`);
    const orgs = await orgsRes.json();
    const pendingOrg = orgs.find(o => o.status === 'Pending');

    if (pendingOrg) {
        console.log(`Found pending organization: ${pendingOrg.name} (${pendingOrg._id})`);

        // Approve it
        const approveRes = await fetch(`${BASE_URL}/api/organizations/${pendingOrg._id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': adminCookie
            },
            body: JSON.stringify({ status: 'Verified' })
        });

        if (approveRes.ok) {
            console.log(`Successfully verified organization: ${pendingOrg.name}`);
        } else {
            console.log("Failed to verify organization:", await approveRes.text());
        }
    } else {
        console.log("No pending organizations found to test approval.");
    }


    // 2. Organization login to test volunteer approval
    console.log("\\n--- Testing Organizer Workflow ---");
    const orgLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'contact@greentech.org', password: 'crewup2026' })
    });

    if (!orgLoginRes.ok) throw new Error("Org login failed");
    const orgCookie = orgLoginRes.headers.get('set-cookie');
    console.log("GreenTech Organizer login successful!");

    // 3. Register a volunteer for testing (since they need a registration)
    console.log("\\n--- Registering a Volunteer for testing ---");

    // First login as the volunteer we know exists, Wait, I don't know a volunteer email. 
    // Let's create a new volunteer user first via register endpoint
    const volReg = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: 'testvol@example.com',
            password: 'testpassword',
            displayName: 'Test Volunteer',
            role: 'volunteer'
        })
    });

    const volCookie = volReg.ok ? volReg.headers.get('set-cookie') : null;

    let volCookieToUse = volCookie;

    if (!volReg.ok && volReg.status === 409) {
        // If it already exists, just login
        const volLogin = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'testvol@example.com', password: 'testpassword' })
        });
        volCookieToUse = volLogin.headers.get('set-cookie');
    }

    // Find an event owned by GreenTech to register for
    const allEventsRes = await fetch(`${BASE_URL}/api/events`);
    const allEvents = await allEventsRes.json();
    // Find an event by GreenTech
    const orgEvent = allEvents.find(e => e.organizer && e.organizer.name === 'GreenTech Initiative');

    if (orgEvent && volCookieToUse) {
        // Register the volunteer to this event
        await fetch(`${BASE_URL}/api/registrations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': volCookieToUse
            },
            body: JSON.stringify({ event: orgEvent._id || orgEvent.id })
        });
        console.log(`Test Volunteer registered for event: ${orgEvent.title}`);
    }

    // 4. Fetch registrations as the Organizer and approve it
    const regsRes = await fetch(`${BASE_URL}/api/registrations`, {
        headers: { 'Cookie': orgCookie }
    });
    const regs = await regsRes.json();

    if (regs.length > 0) {
        const pendingReg = regs.find(r => r.status !== 'Approved');
        if (pendingReg) {
            console.log(`Found pending volunteer registration: ${pendingReg._id}`);

            const approveVolRes = await fetch(`${BASE_URL}/api/registrations/${pendingReg._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': orgCookie
                },
                body: JSON.stringify({ status: 'Approved' })
            });

            if (approveVolRes.ok) {
                console.log(`Successfully approved volunteer registration for: ${orgEvent.title}`);
            } else {
                console.log("Failed to approve volunteer:", await approveVolRes.text());
            }
        } else {
            console.log("All volunteer registrations are already approved.");
        }
    } else {
        console.log("No registrations found for this organizer.");
    }
}

runTests().catch(console.error);
