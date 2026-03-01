// Mock Database
export const data = {
    languages: [
        {
            id: "html",
            name: "HTML",
            icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
            description: {
                th: "ภาษาโครงสร้างพื้นฐานสำหรับเว็บไซต์",
                en: "The standard markup language for documents designed to be displayed in a web browser."
            },
            elementsCount: 120
        },
        {
            id: "css",
            name: "CSS",
            icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`,
            description: {
                th: "ภาษาสำหรับจัดตกแต่งรูปแบบหน้าเว็บ",
                en: "Style sheet language used for describing the presentation of a document written in HTML."
            },
            elementsCount: 300
        },
        {
            id: "js",
            name: "JavaScript",
            icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 18l6-6-6-6"></path><path d="M8 6l-6 6 6 6"></path></svg>`,
            description: {
                th: "ภาษาโปรแกรมสำหรับสร้างความโต้ตอบบนหน้าเว็บ",
                en: "High-level, often just-in-time compiled language that conforms to the ECMAScript specification."
            },
            elementsCount: 500
        }
    ],
    categories: [
        {
            id: "text-content",
            language: "html",
            name: { th: "เนื้อหาข้อความ", en: "Text Content" },
            count: 12
        },
        {
            id: "selectors",
            language: "css",
            name: { th: "ตัวเลือก (Selectors)", en: "Selectors" },
            count: 24
        }
    ],
    elements: [
        {
            id: "html-h1",
            language: "html",
            category: "text-content",
            name: "<h1>",
            description: {
                th: "หัวข้อระดับ 1 (Heading Level 1)",
                en: "Represents the highest section heading."
            },
            syntax: "<h1>Your Heading Content</h1>",
            example: "<h1>Hello World</h1>",
            version: "HTML5",
            deprecated: false,
            attributes: [
                { name: "global", desc: "Supports all global attributes" }
            ],
            related: ["html-h2", "html-h3"]
        }
    ]
};

export const i18n = {
    th: {
        search_placeholder: "ค้นหาองค์ประกอบโค้ด...",
        home: "หน้าหลัก",
        languages: "ภาษาโปรแกรม",
        recently_added: "เพิ่มล่าสุด",
        settings: "ตั้งค่า",
        appearance: "รูปลักษณ์",
        language: "ภาษา",
        dark_mode: "โหมดมืด",
        light_mode: "โหมดสว่าง",
        back_to_home: "กลับสู่หน้าหลัก",
        stats_elements: "องค์ประกอบทั้งหมด",
        stats_languages: "ภาษารองรับ"
    },
    en: {
        search_placeholder: "Search elements...",
        home: "Home",
        languages: "Languages",
        recently_added: "Recently Added",
        settings: "Settings",
        appearance: "Appearance",
        language: "Language",
        dark_mode: "Dark Mode",
        light_mode: "Light Mode",
        back_to_home: "Back to Home",
        stats_elements: "Total Elements",
        stats_languages: "Languages Supported"
    }
};

