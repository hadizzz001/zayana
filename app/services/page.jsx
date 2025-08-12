"use client";

export default function WhatWeDo() {
  const rows = [
    {
      number: 1,
      title: "Hospitality Solutions",
      text: "Discover our full suite of services, from hotel management and F&B operations to innovative marketing and asset optimization. We deliver tailored solutions designed to maximize performance and deliver sustained success across every aspect of your hospitality business.",
      img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004302/6893c3992efc37104b6349d1_688b83114ba5e29ca3872c51_web-home-image-test-hosp_dkhaht.jpg",
    },
    {
      number: 2,
      title: "Hotel Management",
      text: "Our world-class team of professionals offers centralized services, ensuring the highest levels of expertise and cost efficiency across all operations. With a focus on excellence, we provide tailored solutions to drive success at every level.",
      list: [
        "Expertise across all facets of hotel operations",
        "Food & Beverage",
        "Revenue management and analytics",
        "Sales",
        "Marketing",
        "Reservations",
        "Distribution and e-commerce",
        "Pre-opening management",
        "Procurement",
        "Design",
        "Finance",
        "Information Technology",
        "Human resources",
        "Talent acquisition",
      ],
      img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004302/6893c3992efc37104b6349d3_688b8373322cc77b23963a29_web-home-image-test-comp_hgfrbu.jpg",
    },
    {
      number: 3,
      title: "Asset Management",
      text: "Zayana Hospitality's Asset Management team delivers tailored solutions throughout the hospitality life-cycle, aligning stakeholders with the owner's goals to drive successful partnerships, optimize asset value, and maximize returns through strategic initiatives.",
      list: [
        "Asset Optimization",
        "Life-cycle management to ensure asset longevity and efficiency",
        "Technical audits",
        "Selection of annual maintenance contracts",
        "Development of robust repairs and maintenance strategies",
        "Special project guidance",
        "Energy cost optimization",
        "Architectural/Interior Design services",
        "Management of property improvement plans required by brands",
        "Renovation guidance",
      ],
      paragraph:
        "The property’s strategic repositioning has resulted in stronger performance, achieved through segmentation and rate optimization, cost reductions in staff accommodation, laundry, and waste management, efficiency gains in payroll clustering, and the implementation of targeted seasonal revenue strategies.",
      img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004302/6893c3992efc37104b6349d2_688b834731e38d68b82a19f9_web-home-image-test-software_v1w1xg.jpg",
    },
    {
      number: 4,
      title: "Food and Beverage",
      text: "We bring a restaurateur’s approach to our food and beverage (F&B) outlets, ensuring every detail is meticulously crafted to deliver exceptional cuisine and exemplary service. From our Risen Artisan Bakeries to specialty restaurants, we design experiences that resonate with both guests and communities.",
      list: [
        "Operational expertise across all types of F&B outlets",
        "Integrated F&B strategies",
        "Market analysis to align offerings with guest and community needs",
        "Concept design and delivery for unique dining experiences",
        "Joint venture and third-party partnerships for sourcing and engagements",
        "Task force support for new openings and special events",
        "Creation of dining destinations through authentic, relevant, and unique concepts",
      ],
      img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004961/food-service-header-2023.jpg_m4ltn2.webp",
    },
    {
      number: 5,
      title: "Owner Services",
      text: "At Zayana Hospitality, we prioritize the owner’s interests, ensuring optimal results through constant communication and complete transparency. By tailoring our services to meet specific goals, we create strong partnerships and unlock the full potential of every asset.",
      list: [
        "Provide technical services",
        "Create business plans (pre-opening)",
        "Pre-opening budget planning",
        "Conversion of Hotel Management Agreements to Franchise Agreements",
        "Bi-monthly revenue analysis and briefings",
        "Monthly business review meetings",
        "Brand creation or brand selection for hotels",
      ],
      img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004961/hotel-reception-counter-desk-bell-skvalval_xschbi.jpg", // Replace as needed
    },
    {
      number: 6,
      title: "Hotels & Hotel Apartments",
      text: "Our fast-growing portfolio of hotels and hotel apartments are centrally located close to Riyadh, Beirut’s, Abuja and Obudu famous attractions. With more properties under development, we are setting new benchmarks for hospitality excellence in one of the world’s most competitive hospitality markets.",
      img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755010951/bold-giesing-lisasyberg-379_zxjxlb.webp", // Replace as needed
    },
{
  number: 7,
  title: "Restaurants",
  text: "Zayana Hospitality ranks among Beirut’s, Abuja’s, Obudu’s and Riyadh’s fastest-growing F&B operators, with a portfolio of unique, award-winning restaurants that are renowned for providing guests with highly memorable dining experiences.",
  list: [
    "All day dining",
    "Restaurant",
    "Restaurant & Lounge",
    "Specialty Restaurants & Bars",
    "Beach Club",
    "Café",
    "Gastro Pub",
    "Café & Bar"
  ],
  img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755010947/lucky-cat-restaurant-interiors-london-afroditi-krassa_dezeen_hero-1-852x479_vzdtyc.webp", // Replace as needed
},
  ];

  return (
    <section className="mx-auto bg-black p-10 myWhatBack min-h-screen">
      {/* First Row: Title */}
      <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-start mb-10 text-center md:text-left">
        <div>
          <p className="what1">What We Do</p>
        </div>
        <div></div>
      </div>

      {/* Data Rows */}
      {rows.map((row) => (
        <div key={row.number}>
          <div className="grid grid-cols-1 md:grid-cols-[25%_75%] gap-8 py-8">
            {/* Left Column - empty on desktop */}
            <div className="hidden md:block"></div>

            {/* Right Column - Content */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 myBorder123123 justify-center">
              {/* Image */}
              <div
                className="flex-shrink-0 relative mb-4 md:mb-0 rounded-lg overflow-hidden"
                style={{ width: "250px", height: "140px" }}
              >
                <img
                  src={row.img}
                  alt={row.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text */}
              <div className="mobcenter">
                <h3 className="flex items-center justify-center md:justify-start text-2xl font-semibold text-[#e0dcd6]">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full mr-2 numberT">
                    {row.number}
                  </div>
                  {row.title}
                </h3>
                <p className="grText">{row.text}</p>

                {/* Custom bullet list */}
                {row.list && (
                  <ul
                    style={{
                      color: "#666",
                      textAlign: "left",
                      paddingLeft: "20px",
                      listStyleType: "none",
                      marginTop: "20px",
                    }}
                  >
                    {row.list.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          position: "relative",
                          paddingLeft: "30px",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#CBAB58",
                            borderRadius: "50%",
                            display: "inline-block",
                          }}
                        ></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Paragraph under the list for Asset Management */}
                {row.paragraph && (
                  <p className="grText mt-4">{row.paragraph}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
