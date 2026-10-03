import "dotenv/config";
import mongoose from "mongoose";
import User from "./model/user.js";
import Organization from "./model/organization.js";

const migrate = async () => {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");

    // Find all users with role 'organization'
    const orgUsers = await User.find({ role: "organization" });
    console.log(`Found ${orgUsers.length} organization user(s)`);

    let created = 0;
    let skipped = 0;

    for (const user of orgUsers) {
        // Check if an Organization document already exists for this user
        const existing = await Organization.findOne({
            $or: [
                { userId: user._id },
                { name: user.displayName },
                { email: user.username },
            ],
        });

        if (existing) {
            // Link the userId if it's missing
            if (!existing.userId) {
                await Organization.findByIdAndUpdate(existing._id, { userId: user._id });
                console.log(`  Linked userId to existing org: "${existing.name}"`);
            } else {
                console.log(`  Skipping — org already exists for: "${user.displayName}"`);
            }
            skipped++;
        } else {
            // Create a new Pending Organization document
            await Organization.create({
                name: user.displayName || user.username,
                email: user.username,
                image: user.image || null,
                status: "Pending",
                verified: false,
                userId: user._id,
            });
            console.log(`  Created Pending org for: "${user.displayName}" (${user.username})`);
            created++;
        }
    }

    console.log(`\nMigration complete: ${created} created, ${skipped} skipped/linked`);
    await mongoose.disconnect();
};

migrate().catch((err) => {
    console.error("Migration failed:", err);
    mongoose.disconnect();
    process.exit(1);
});
