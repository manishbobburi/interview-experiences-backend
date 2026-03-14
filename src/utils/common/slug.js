const slugify = require("slugify");
const { nanoid } = require("nanoid");

function generateSlug(company, role) {
    const base = `${company} ${role} interview experience`;

    const slug = slugify(base, {
        lower: true,
        strict: true,
        trim: true,
    });

    return `${slug}-${nanoid(8)}`;
}

module.exports = generateSlug;