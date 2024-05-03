
export type DiseaseInfo = {
    generalAdvice: string;
    otcMedication: string;
};

export const diseases: Record<string, DiseaseInfo> = {
    "acne": {
        generalAdvice: "Keep the affected area clean. Avoid heavy skin creams and make sure to use 'non-comedogenic' makeup products that do not clog pores.",
        otcMedication: "Products containing benzoyl peroxide or salicylic acid can be helpful."
    },
    "allergy": {
        "generalAdvice": "Avoid known allergens. Use an air purifier to reduce airborne allergens in your home.",
        "otcMedication": "Antihistamines like Loratadine, Cetirizine, or Allegra (Fexofenadine) can help relieve symptoms."
    },
    "arthritis": {
        generalAdvice: "Maintain a healthy weight. Exercise regularly but avoid straining the joints with high-impact activities.",
        otcMedication: "Ibuprofen or naproxen can be used to reduce pain and inflammation."
    },
    "bronchial asthma": {
        generalAdvice: "Avoid triggers such as smoke, pollen, or pets. Keep your living areas dust-free.",
        otcMedication: "Inhalers like albuterol can help manage symptoms in emergency situations."
    },
    "cervical spondylosis": {
        generalAdvice: "Maintain proper posture. Use ergonomic furniture and take frequent breaks if you work at a desk.",
        otcMedication: "OTC pain relievers like acetaminophen can help manage pain."
    },
    "chicken pox": {
        generalAdvice: "Avoid scratching to prevent infection. Keep hydrated and rest.",
        otcMedication: "Calamine lotion and oatmeal baths can help relieve itching."
    },
    "common cold": {
        generalAdvice: "Stay hydrated and rest. Keep warm and avoid sudden temperature changes.",
        otcMedication: "Decongestants and pain relievers like acetaminophen can alleviate symptoms."
    },
    "dengue": {
        generalAdvice: "Use mosquito repellent and stay in screened-in or air-conditioned areas.",
        otcMedication: "Pain relievers like acetaminophen can help, but avoid aspirin as it can increase bleeding risk."
    },
    "diabetes": {
        generalAdvice: "Monitor your blood sugar levels regularly. Maintain a balanced diet and regular exercise.",
        otcMedication: "Consult a healthcare provider for appropriate medications; OTC options are limited for diabetes management."
    },
    "dimorphic hemorrhoids": {
        generalAdvice: "Avoid straining during bowel movements. Stay hydrated and eat a high-fiber diet.",
        otcMedication: "Hemorrhoid creams and suppositories can provide relief."
    },
    "drug reaction": {
        generalAdvice: "Discontinue use of the drug if possible and consult a healthcare provider.",
        otcMedication: "Antihistamines can help relieve symptoms, but medical advice is crucial."
    },
    "flu": {
        generalAdvice: "Rest, stay hydrated, and avoid contact with other people.",
        otcMedication: "Antiviral drugs may be prescribed by a doctor; OTC pain relievers can reduce symptoms."
    },
    "fungal infection": {
        generalAdvice: "Keep the affected area clean and dry. Avoid using public showers without footwear.",
        otcMedication: "Antifungal creams and powders such as clotrimazole or miconazole."
    },
    "gastroesophageal reflux disease": {
        generalAdvice: "Avoid spicy and fatty foods. Eat smaller meals and elevate your head while sleeping.",
        otcMedication: "Antacids, H2 blockers, and proton pump inhibitors can be used for symptom relief."
    },
    "hiv/aids": {
        generalAdvice: "Follow medical advice for management. Maintain a healthy lifestyle and regular medical check-ups.",
        otcMedication: "OTC medications for symptom management should be used under medical guidance."
    },
    "hypertension": {
        generalAdvice: "Monitor your blood pressure regularly. Maintain a healthy diet and regular physical activity.",
        otcMedication: "Consult a healthcare provider; specific prescription medications are used for management."
    },
    "impetigo": {
        generalAdvice: "Keep the affected area clean and covered. Avoid touching or scratching.",
        otcMedication: "Antibiotic ointments can be used, but prescription options are often recommended."
    },
    "irritable bowel syndrome": {
        generalAdvice: "Identify and avoid trigger foods. Manage stress and consider psychological therapies if needed.",
        otcMedication: "Fiber supplements, laxatives, or antidiarrheal medications can be used depending on symptoms."
    },
    "jaundice": {
        generalAdvice: "Rest and maintain adequate hydration. Follow the specific treatment advice for the underlying cause.",
        otcMedication: "OTC medication may not be directly beneficial; treatment should focus on the underlying condition."
    },
    "malaria": {
        generalAdvice: "Use mosquito nets and repellents. Stay in well-screened areas at night.",
        otcMedication: "Antimalarial drugs should be prescribed based on travel history and lab tests."
    },
    "migraine": {
        generalAdvice: "Avoid triggers such as stress, noise, or certain foods. Maintain a regular sleep schedule.",
        otcMedication: "OTC pain relievers like ibuprofen or aspirin can help, but sometimes prescription medication is necessary."
    },
    "peptic ulcer disease": {
        generalAdvice: "Avoid foods that irritate the stomach. Stop smoking and reduce stress.",
        otcMedication: "Antacids and other medications like H2 blockers can provide symptom relief."
    },
    "pneumonia": {
        generalAdvice: "Follow your doctor's advice. Rest and stay hydrated.",
        otcMedication: "Antibiotics are needed for bacterial pneumonia; consult a healthcare provider."
    },
    "psoriasis": {
        generalAdvice: "Moisturize regularly. Avoid triggers that can cause flare-ups.",
        otcMedication: "Topical treatments like corticosteroid creams can help manage symptoms."
    },
    "strep throat": {
        generalAdvice: "Stay hydrated and get plenty of rest. Avoid spicy and acidic foods.",
        otcMedication: "Antibiotics are needed; OTC pain relievers like acetaminophen can help with symptoms."
    },
    "typhoid": {
        generalAdvice: "Drink only boiled or bottled water. Follow a high-calorie, easy-to-digest diet.",
        otcMedication: "Antibiotics are essential for treatment; OTC medications are not sufficient."
    },
    "urinary tract infection": {
        generalAdvice: "Increase your fluid intake. Urinate frequently to help flush out bacteria.",
        otcMedication: "Phenazopyridine can be used to reduce pain, but antibiotics are often required."
    },
    "varicose veins": {
        generalAdvice: "Wear compression stockings. Elevate your legs when resting.",
        otcMedication: "OTC medications may not be effective; surgical treatments may be necessary."
    },
    "vitamin d deficiency": {
        generalAdvice: "Increase sun exposure safely. Include vitamin D-rich foods in your diet or consider supplements.",
        otcMedication: "Vitamin D supplements are widely available."
    },
    "yeast infection": {
        generalAdvice: "Keep the affected area clean and dry. Avoid scented hygiene products.",
        otcMedication: "Antifungal creams such as clotrimazole or miconazole."
    }
};
