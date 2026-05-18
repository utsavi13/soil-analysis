# ALGORITHM FLOWCHART
## Crop Recommendation and Fertilizer Suggestion Logic

---

## MAIN RECOMMENDATION ALGORITHM FLOWCHART

```
┌─────────────────────────────────────────────────────────────────────┐
│           CROP RECOMMENDATION ALGORITHM FLOWCHART                   │
└─────────────────────────────────────────────────────────────────────┘

                            START
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Receive Soil Test  │
                    │  Input: pH, N, P, K │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Validate Input     │
                    │  - pH: 0-14         │
                    │  - N, P, K: >= 0    │
                    └─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
              ┌──────────┐        ┌──────────┐
              │  Valid?  │───NO──>│  Return  │
              └──────────┘        │  Error   │
                    │             └──────────┘
                   YES                  │
                    │                   │
                    ▼                   ▼
          ┌─────────────────────┐    END
          │  Store Test Data    │
          │  in Database        │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Fetch All Crops    │
          │  with Ideal         │
          │  Requirements       │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Initialize Empty   │
          │  Crop Score List    │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  For Each Crop      │<──────────┐
          │  in Database        │           │
          └─────────────────────┘           │
                    │                       │
                    ▼                       │
          ┌─────────────────────┐           │
          │  Initialize Score   │           │
          │  score = 0          │           │
          └─────────────────────┘           │
                    │                       │
                    ▼                       │
          ┌─────────────────────┐           │
          │  Check pH Range     │           │
          │  pH >= min AND      │           │
          │  pH <= max?         │           │
          └─────────────────────┘           │
                    │                       │
          ┌─────────┴─────────┐             │
          │                   │             │
          ▼                   ▼             │
    ┌──────────┐        ┌──────────┐       │
    │   YES    │        │    NO    │       │
    │ score += │        │ Calculate│       │
    │   100    │        │ deviation│       │
    └──────────┘        │ score -= │       │
          │             │ deviation│       │
          │             │   * 20   │       │
          │             └──────────┘       │
          │                   │             │
          └─────────┬─────────┘             │
                    ▼                       │
          ┌─────────────────────┐           │
          │  Calculate NPK      │           │
          │  Deviations:        │           │
          │  nDev = |N - idealN││           │
          │  pDev = |P - idealP││           │
          │  kDev = |K - idealK││           │
          └─────────────────────┘           │
                    │                       │
                    ▼                       │
          ┌─────────────────────┐           │
          │  Adjust Score:      │           │
          │  score -= (nDev +   │           │
          │  pDev + kDev) / 3   │           │
          └─────────────────────┘           │
                    │                       │
                    ▼                       │
          ┌─────────────────────┐           │
          │  Store Crop with    │           │
          │  Score & Deviations │           │
          └─────────────────────┘           │
                    │                       │
                    ▼                       │
          ┌─────────────────────┐           │
          │  More Crops?        │───YES─────┘
          └─────────────────────┘
                    │
                   NO
                    ▼
          ┌─────────────────────┐
          │  Sort Crops by      │
          │  Score (Descending) │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Select Top 5       │
          │  Crops              │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Get Best Crop      │
          │  (Rank 1)           │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Calculate Nutrient │
          │  Deficiencies for   │
          │  Best Crop          │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Generate Fertilizer│
          │  Recommendations    │
          │  (See Fertilizer    │
          │   Flowchart)        │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Store              │
          │  Recommendations    │
          │  in Database        │
          └─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  Return Results:    │
          │  - Top 5 Crops      │
          │  - Fertilizers      │
          │  - Amounts          │
          └─────────────────────┘
                    │
                    ▼
                   END
```

---

## FERTILIZER RECOMMENDATION ALGORITHM FLOWCHART

```
┌─────────────────────────────────────────────────────────────────────┐
│         FERTILIZER RECOMMENDATION ALGORITHM FLOWCHART               │
└─────────────────────────────────────────────────────────────────────┘

                            START
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Input: Soil NPK    │
                    │  Best Crop Ideal    │
                    │  Requirements       │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Calculate          │
                    │  Deficiencies:      │
                    │  nDef = idealN - N  │
                    │  pDef = idealP - P  │
                    │  kDef = idealK - K  │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Initialize Empty   │
                    │  Fertilizer List    │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Fetch All          │
                    │  Fertilizers from   │
                    │  Database           │
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Check Nitrogen     │
                    │  Deficiency         │
                    │  nDef < -10?        │
                    └─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
              ┌──────────┐        ┌──────────┐
              │   YES    │        │    NO    │
              └──────────┘        └──────────┘
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Filter Fertilizers │       │
          │  with N > 20%       │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Select Fertilizer  │       │
          │  with Highest N     │       │
          │  Content            │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Calculate Amount:  │       │
          │  amount = |nDef| /  │       │
          │  (N_content/100)    │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Add to Fertilizer  │       │
          │  Recommendation List│       │
          └─────────────────────┘       │
                    │                   │
                    └─────────┬─────────┘
                              ▼
                    ┌─────────────────────┐
                    │  Check Phosphorus   │
                    │  Deficiency         │
                    │  pDef < -10?        │
                    └─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
              ┌──────────┐        ┌──────────┐
              │   YES    │        │    NO    │
              └──────────┘        └──────────┘
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Filter Fertilizers │       │
          │  with P > 15%       │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Select Fertilizer  │       │
          │  with Highest P     │       │
          │  Content            │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Calculate Amount   │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Add to List        │       │
          └─────────────────────┘       │
                    │                   │
                    └─────────┬─────────┘
                              ▼
                    ┌─────────────────────┐
                    │  Check Potassium    │
                    │  Deficiency         │
                    │  kDef < -10?        │
                    └─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
              ┌──────────┐        ┌──────────┐
              │   YES    │        │    NO    │
              └──────────┘        └──────────┘
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Filter Fertilizers │       │
          │  with K > 20%       │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Select Fertilizer  │       │
          │  with Highest K     │       │
          │  Content            │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Calculate Amount   │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Add to List        │       │
          └─────────────────────┘       │
                    │                   │
                    └─────────┬─────────┘
                              ▼
                    ┌─────────────────────┐
                    │  Fertilizer List    │
                    │  Empty?             │
                    └─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
              ┌──────────┐        ┌──────────┐
              │   YES    │        │    NO    │
              └──────────┘        └──────────┘
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  No Major           │       │
          │  Deficiencies       │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Recommend Balanced │       │
          │  Fertilizer         │       │
          │  (NPK 20-20-20)     │       │
          └─────────────────────┘       │
                    │                   │
                    ▼                   │
          ┌─────────────────────┐       │
          │  Amount: 50 kg/ha   │       │
          │  (Maintenance Dose) │       │
          └─────────────────────┘       │
                    │                   │
                    └─────────┬─────────┘
                              ▼
                    ┌─────────────────────┐
                    │  Return Fertilizer  │
                    │  Recommendations    │
                    │  with Amounts       │
                    └─────────────────────┘
                              │
                              ▼
                             END
```

---

## SCORING ALGORITHM DETAILS

### Crop Suitability Score Calculation

```
┌─────────────────────────────────────────────────────────────────────┐
│                  SCORING FORMULA                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Initial Score = 0                                                  │
│                                                                     │
│  pH Score:                                                          │
│  ├─ IF (soil_pH >= ideal_pH_min AND soil_pH <= ideal_pH_max)       │
│  │     score += 100                                                │
│  └─ ELSE                                                            │
│        pH_deviation = MIN(|soil_pH - ideal_pH_min|,                │
│                           |soil_pH - ideal_pH_max|)                │
│        score -= pH_deviation * 20                                  │
│                                                                     │
│  NPK Score:                                                         │
│  ├─ N_deviation = |soil_N - ideal_N|                               │
│  ├─ P_deviation = |soil_P - ideal_P|                               │
│  ├─ K_deviation = |soil_K - ideal_K|                               │
│  └─ score -= (N_deviation + P_deviation + K_deviation) / 3         │
│                                                                     │
│  Final Score = score                                                │
│                                                                     │
│  Higher score = Better suitability                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Fertilizer Amount Calculation

```
┌─────────────────────────────────────────────────────────────────────┐
│              FERTILIZER AMOUNT FORMULA                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  For each deficient nutrient:                                       │
│                                                                     │
│  deficiency = ideal_value - soil_value                              │
│                                                                     │
│  IF deficiency > 10:                                                │
│     nutrient_needed = |deficiency| kg/hectare                       │
│                                                                     │
│     fertilizer_amount = nutrient_needed /                           │
│                        (fertilizer_content_percentage / 100)        │
│                                                                     │
│     Example:                                                        │
│     If N deficiency = 50 kg/ha                                      │
│     And Urea has 46% N                                              │
│     Then: 50 / (46/100) = 50 / 0.46 = 108.7 kg/ha of Urea          │
│                                                                     │
│  Round up to nearest whole number                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ALGORITHM COMPLEXITY ANALYSIS

### Time Complexity

**Crop Recommendation:**
- Fetching crops: O(n) where n = number of crops
- Scoring each crop: O(n)
- Sorting crops: O(n log n)
- Overall: O(n log n)

**Fertilizer Recommendation:**
- Fetching fertilizers: O(m) where m = number of fertilizers
- Filtering for each nutrient: O(m)
- Overall: O(m)

**Total Algorithm Complexity: O(n log n + m)**

### Space Complexity

- Crop list storage: O(n)
- Fertilizer list storage: O(m)
- Overall: O(n + m)

---

## ALGORITHM PSEUDOCODE

### Crop Recommendation Pseudocode

```
FUNCTION generateCropRecommendations(pH, N, P, K):
    crops = FETCH_ALL_CROPS_WITH_REQUIREMENTS()
    cropScores = []
    
    FOR EACH crop IN crops:
        score = 0
        
        // pH scoring
        IF pH >= crop.ideal_pH_min AND pH <= crop.ideal_pH_max:
            score += 100
        ELSE:
            pHDeviation = MIN(ABS(pH - crop.ideal_pH_min),
                             ABS(pH - crop.ideal_pH_max))
            score -= pHDeviation * 20
        
        // NPK scoring
        nDeviation = ABS(N - crop.ideal_N)
        pDeviation = ABS(P - crop.ideal_P)
        kDeviation = ABS(K - crop.ideal_K)
        
        score -= (nDeviation + pDeviation + kDeviation) / 3
        
        // Store crop with score
        cropScores.APPEND({
            crop: crop,
            score: score,
            deviations: {N: N - crop.ideal_N,
                        P: P - crop.ideal_P,
                        K: K - crop.ideal_K}
        })
    
    // Sort and select top 5
    cropScores.SORT_BY(score, DESCENDING)
    topCrops = cropScores[0:5]
    
    RETURN topCrops
END FUNCTION
```

### Fertilizer Recommendation Pseudocode

```
FUNCTION generateFertilizerRecommendations(soilN, soilP, soilK, bestCrop):
    fertilizers = FETCH_ALL_FERTILIZERS()
    recommendations = []
    
    // Calculate deficiencies
    nDef = bestCrop.ideal_N - soilN
    pDef = bestCrop.ideal_P - soilP
    kDef = bestCrop.ideal_K - soilK
    
    // Nitrogen deficiency
    IF nDef > 10:
        nFerts = FILTER(fertilizers, f => f.nitrogen_content > 20)
        bestNFert = MAX(nFerts, BY nitrogen_content)
        amount = CEILING(nDef / (bestNFert.nitrogen_content / 100))
        recommendations.APPEND({
            nutrient: "Nitrogen",
            fertilizer: bestNFert.name,
            amount: amount + " kg/ha"
        })
    
    // Phosphorus deficiency
    IF pDef > 10:
        pFerts = FILTER(fertilizers, f => f.phosphorus_content > 15)
        bestPFert = MAX(pFerts, BY phosphorus_content)
        amount = CEILING(pDef / (bestPFert.phosphorus_content / 100))
        recommendations.APPEND({
            nutrient: "Phosphorus",
            fertilizer: bestPFert.name,
            amount: amount + " kg/ha"
        })
    
    // Potassium deficiency
    IF kDef > 10:
        kFerts = FILTER(fertilizers, f => f.potassium_content > 20)
        bestKFert = MAX(kFerts, BY potassium_content)
        amount = CEILING(kDef / (bestKFert.potassium_content / 100))
        recommendations.APPEND({
            nutrient: "Potassium",
            fertilizer: bestKFert.name,
            amount: amount + " kg/ha"
        })
    
    // If no deficiencies
    IF recommendations.IS_EMPTY():
        recommendations.APPEND({
            nutrient: "Balanced",
            fertilizer: "NPK 20-20-20",
            amount: "50 kg/ha (maintenance)"
        })
    
    RETURN recommendations
END FUNCTION
```

---

END OF ALGORITHM FLOWCHART DOCUMENTATION
