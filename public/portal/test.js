import { r as m, j as e, L as y } from "./portal.js";
function N() {
  const [i, h] = m.useState("attendance"),
    [r, c] = m.useState([]),
    [o, u] = m.useState("all"),
    x = [
      {
        id: "1",
        name: "Aarav Sharma",
        class: "11-A",
        rollNumber: "001",
        email: "aarav.sharma@email.com",
        phone: "+91 9876543210",
        attendance: { present: 85, total: 100 },
      },
      {
        id: "2",
        name: "Priya Patel",
        class: "11-A",
        rollNumber: "002",
        email: "priya.patel@email.com",
        phone: "+91 9876543211",
        attendance: { present: 92, total: 100 },
      },
      {
        id: "3",
        name: "Arjun Kumar",
        class: "11-A",
        rollNumber: "003",
        email: "arjun.kumar@email.com",
        phone: "+91 9876543212",
        attendance: { present: 78, total: 100 },
      },
      {
        id: "4",
        name: "Sneha Gupta",
        class: "11-A",
        rollNumber: "004",
        email: "sneha.gupta@email.com",
        phone: "+91 9876543213",
        attendance: { present: 88, total: 100 },
      },
      {
        id: "5",
        name: "Rohit Singh",
        class: "11-A",
        rollNumber: "005",
        email: "rohit.singh@email.com",
        phone: "+91 9876543214",
        attendance: { present: 95, total: 100 },
      },
      {
        id: "6",
        name: "Kavya Reddy",
        class: "11-A",
        rollNumber: "006",
        email: "kavya.reddy@email.com",
        phone: "+91 9876543215",
        attendance: { present: 82, total: 100 },
      },
      {
        id: "7",
        name: "Vikram Joshi",
        class: "11-A",
        rollNumber: "007",
        email: "vikram.joshi@email.com",
        phone: "+91 9876543216",
        attendance: { present: 90, total: 100 },
      },
      {
        id: "8",
        name: "Ananya Verma",
        class: "11-A",
        rollNumber: "008",
        email: "ananya.verma@email.com",
        phone: "+91 9876543217",
        attendance: { present: 87, total: 100 },
      },
    ],
    g = (t) => {
      c((s) => (s.includes(t) ? s.filter((a) => a !== t) : [...s, t]));
    },
    p = (t) => {
      if (r.length === 0) {
        alert("Please select students first");
        return;
      }
      console.log(`Marking ${r.length} students as ${t}`),
        c([]),
        alert(`${r.length} students marked as ${t}`);
    },
    b = () => {
      const t = document.createElement("canvas");
      (t.width = 800), (t.height = 600);
      const s = t.getContext("2d");
      if (s) {
        (s.fillStyle = "#ffffff"),
          s.fillRect(0, 0, 800, 600),
          (s.fillStyle = "#000000"),
          (s.font = "24px Arial"),
          s.fillText("Weekly Attendance Report", 50, 50),
          (s.font = "16px Arial"),
          s.fillText("Class: 11-A", 50, 100),
          s.fillText(`Date: ${new Date().toLocaleDateString()}`, 50, 130);
        let a = 180;
        x.forEach((l, n) => {
          const j = Math.round(
            (l.attendance.present / l.attendance.total) * 100
          );
          s.fillText(`${l.rollNumber}. ${l.name} - ${j}%`, 50, a), (a += 30);
        });
      }
      t.toBlob((a) => {
        if (a) {
          const l = URL.createObjectURL(a),
            n = document.createElement("a");
          (n.href = l),
            (n.download = `attendance-report-${
              new Date().toISOString().split("T")[0]
            }.png`),
            document.body.appendChild(n),
            n.click(),
            document.body.removeChild(n),
            URL.revokeObjectURL(l);
        }
      });
    },
    d = x.filter((t) => {
      if (o === "all") return !0;
      const s = (t.attendance.present / t.attendance.total) * 100;
      return o === "present" ? s >= 85 : o === "absent" ? s < 85 : !0;
    });
  return e.jsxs("div", {
    className: "min-h-screen bg-gray-50",
    children: [
      e.jsx("div", {
        className: "bg-white shadow-sm border-b",
        children: e.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",
          children: e.jsxs("div", {
            className: "flex items-center justify-between",
            children: [
              e.jsxs("div", {
                className: "flex items-center space-x-4",
                children: [
                  e.jsx("div", {
                    className:
                      "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center",
                    children: e.jsx("i", {
                      className: "ri-user-line text-white text-lg",
                    }),
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("h1", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "Teacher Dashboard",
                      }),
                      e.jsx("p", {
                        className: "text-gray-600",
                        children: "Welcome back, Prof. Kumar",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "flex items-center space-x-4",
                children: [
                  e.jsxs(y, {
                    to: "/",
                    className:
                      "bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap",
                    children: [
                      e.jsx("i", { className: "ri-home-line mr-2" }),
                      "Home",
                    ],
                  }),
                  e.jsxs("button", {
                    className:
                      "bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap",
                    children: [
                      e.jsx("i", { className: "ri-logout-circle-line mr-2" }),
                      "Logout",
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsx("div", {
        className: "bg-white border-b",
        children: e.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: e.jsxs("div", {
            className: "flex space-x-8",
            children: [
              e.jsxs("button", {
                onClick: () => h("attendance"),
                className: `py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                  i === "attendance"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`,
                children: [
                  e.jsx("i", { className: "ri-user-check-line mr-2" }),
                  "Attendance Management",
                ],
              }),
              e.jsxs("button", {
                onClick: () => h("notifications"),
                className: `py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                  i === "notifications"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`,
                children: [
                  e.jsx("i", { className: "ri-notification-line mr-2" }),
                  "Share Notifications",
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
        children: [
          i === "attendance" &&
            e.jsxs("div", {
              children: [
                e.jsxs("div", {
                  className: "bg-white rounded-lg shadow-md p-6 mb-6",
                  children: [
                    e.jsxs("div", {
                      className:
                        "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0",
                      children: [
                        e.jsxs("div", {
                          className: "flex items-center space-x-4",
                          children: [
                            e.jsx("h2", {
                              className: "text-xl font-semibold text-gray-900",
                              children: "Class 11-A Students",
                            }),
                            e.jsxs("span", {
                              className:
                                "bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full",
                              children: [x.length, " Students"],
                            }),
                          ],
                        }),
                        e.jsxs("div", {
                          className: "flex items-center space-x-4",
                          children: [
                            e.jsxs("div", {
                              className: "flex items-center space-x-2",
                              children: [
                                e.jsx("label", {
                                  className:
                                    "text-sm font-medium text-gray-700",
                                  children: "Filter:",
                                }),
                                e.jsxs("select", {
                                  value: o,
                                  onChange: (t) => u(t.target.value),
                                  className:
                                    "border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8",
                                  children: [
                                    e.jsx("option", {
                                      value: "all",
                                      children: "All Students",
                                    }),
                                    e.jsx("option", {
                                      value: "present",
                                      children: "Good Attendance (>85%)",
                                    }),
                                    e.jsx("option", {
                                      value: "absent",
                                      children: "Poor Attendance (<85%)",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "flex items-center space-x-2",
                              children: [
                                e.jsxs("button", {
                                  onClick: () => p("present"),
                                  disabled: r.length === 0,
                                  className:
                                    "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer whitespace-nowrap",
                                  children: [
                                    e.jsx("i", {
                                      className: "ri-check-line mr-2",
                                    }),
                                    "Mark Present",
                                  ],
                                }),
                                e.jsxs("button", {
                                  onClick: () => p("absent"),
                                  disabled: r.length === 0,
                                  className:
                                    "bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer whitespace-nowrap",
                                  children: [
                                    e.jsx("i", {
                                      className: "ri-close-line mr-2",
                                    }),
                                    "Mark Absent",
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("button", {
                              onClick: b,
                              className:
                                "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap",
                              children: [
                                e.jsx("i", {
                                  className: "ri-download-line mr-2",
                                }),
                                "Save Report",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    r.length > 0 &&
                      e.jsx("div", {
                        className:
                          "mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg",
                        children: e.jsxs("p", {
                          className: "text-blue-800 text-sm",
                          children: [
                            e.jsx("i", {
                              className: "ri-information-line mr-2",
                            }),
                            r.length,
                            " student(s) selected",
                          ],
                        }),
                      }),
                  ],
                }),
                e.jsx("div", {
                  className: "bg-white rounded-lg shadow-md overflow-hidden",
                  children: e.jsx("div", {
                    className: "overflow-x-auto",
                    children: e.jsxs("table", {
                      className: "min-w-full divide-y divide-gray-200",
                      children: [
                        e.jsx("thead", {
                          className: "bg-gray-50",
                          children: e.jsxs("tr", {
                            children: [
                              e.jsx("th", {
                                className:
                                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: e.jsx("input", {
                                  type: "checkbox",
                                  checked:
                                    r.length === d.length && d.length > 0,
                                  onChange: (t) => {
                                    t.target.checked
                                      ? c(d.map((s) => s.id))
                                      : c([]);
                                  },
                                  className:
                                    "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer",
                                }),
                              }),
                              e.jsx("th", {
                                className:
                                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Student",
                              }),
                              e.jsx("th", {
                                className:
                                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Class & Roll No.",
                              }),
                              e.jsx("th", {
                                className:
                                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Contact",
                              }),
                              e.jsx("th", {
                                className:
                                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Attendance",
                              }),
                              e.jsx("th", {
                                className:
                                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                children: "Status",
                              }),
                            ],
                          }),
                        }),
                        e.jsx("tbody", {
                          className: "bg-white divide-y divide-gray-200",
                          children: d.map((t) => {
                            const s = Math.round(
                                (t.attendance.present / t.attendance.total) *
                                  100
                              ),
                              a = r.includes(t.id);
                            return e.jsxs(
                              "tr",
                              {
                                className: `hover:bg-gray-50 ${
                                  a ? "bg-blue-50" : ""
                                }`,
                                children: [
                                  e.jsx("td", {
                                    className: "px-6 py-4 whitespace-nowrap",
                                    children: e.jsx("input", {
                                      type: "checkbox",
                                      checked: a,
                                      onChange: () => g(t.id),
                                      className:
                                        "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer",
                                    }),
                                  }),
                                  e.jsx("td", {
                                    className: "px-6 py-4 whitespace-nowrap",
                                    children: e.jsxs("div", {
                                      className: "flex items-center",
                                      children: [
                                        e.jsx("div", {
                                          className:
                                            "w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4",
                                          children: e.jsx("i", {
                                            className:
                                              "ri-user-line text-gray-600",
                                          }),
                                        }),
                                        e.jsxs("div", {
                                          children: [
                                            e.jsx("div", {
                                              className:
                                                "text-sm font-medium text-gray-900",
                                              children: t.name,
                                            }),
                                            e.jsx("div", {
                                              className:
                                                "text-sm text-gray-500",
                                              children: t.email,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                  e.jsxs("td", {
                                    className: "px-6 py-4 whitespace-nowrap",
                                    children: [
                                      e.jsx("div", {
                                        className: "text-sm text-gray-900",
                                        children: t.class,
                                      }),
                                      e.jsxs("div", {
                                        className: "text-sm text-gray-500",
                                        children: ["Roll No: ", t.rollNumber],
                                      }),
                                    ],
                                  }),
                                  e.jsx("td", {
                                    className: "px-6 py-4 whitespace-nowrap",
                                    children: e.jsx("div", {
                                      className: "text-sm text-gray-900",
                                      children: t.phone,
                                    }),
                                  }),
                                  e.jsxs("td", {
                                    className: "px-6 py-4 whitespace-nowrap",
                                    children: [
                                      e.jsxs("div", {
                                        className: "text-sm text-gray-900",
                                        children: [s, "%"],
                                      }),
                                      e.jsxs("div", {
                                        className: "text-sm text-gray-500",
                                        children: [
                                          t.attendance.present,
                                          "/",
                                          t.attendance.total,
                                          " days",
                                        ],
                                      }),
                                    ],
                                  }),
                                  e.jsx("td", {
                                    className: "px-6 py-4 whitespace-nowrap",
                                    children: e.jsx("span", {
                                      className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        s >= 85
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                      }`,
                                      children: s >= 85 ? "Good" : "Poor",
                                    }),
                                  }),
                                ],
                              },
                              t.id
                            );
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          i === "notifications" &&
            e.jsx("div", {
              children: e.jsxs("div", {
                className: "bg-white rounded-lg shadow-md p-6",
                children: [
                  e.jsx("h2", {
                    className: "text-xl font-semibold text-gray-900 mb-6",
                    children: "Share Important Information",
                  }),
                  e.jsxs("form", {
                    className: "space-y-6",
                    children: [
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: "Notification Type",
                          }),
                          e.jsxs("select", {
                            className:
                              "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8",
                            children: [
                              e.jsx("option", { children: "Important Notice" }),
                              e.jsx("option", { children: "Assignment" }),
                              e.jsx("option", { children: "Exam Schedule" }),
                              e.jsx("option", { children: "Study Material" }),
                              e.jsx("option", {
                                children: "General Announcement",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: "Title",
                          }),
                          e.jsx("input", {
                            type: "text",
                            className:
                              "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                            placeholder: "Enter notification title",
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: "Message",
                          }),
                          e.jsx("textarea", {
                            rows: 6,
                            className:
                              "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                            placeholder: "Enter your message here...",
                            maxLength: 500,
                          }),
                          e.jsx("p", {
                            className: "text-sm text-gray-500 mt-1",
                            children: "Maximum 500 characters",
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: "Attach File (Optional)",
                          }),
                          e.jsxs("div", {
                            className:
                              "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center",
                            children: [
                              e.jsx("i", {
                                className:
                                  "ri-upload-cloud-line text-3xl text-gray-400 mb-2",
                              }),
                              e.jsx("p", {
                                className: "text-sm text-gray-600",
                                children: "Click to upload or drag and drop",
                              }),
                              e.jsx("p", {
                                className: "text-xs text-gray-500",
                                children: "PDF, DOC, or image files (Max 10MB)",
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: "Send To",
                          }),
                          e.jsxs("div", {
                            className: "space-y-2",
                            children: [
                              e.jsxs("label", {
                                className: "flex items-center",
                                children: [
                                  e.jsx("input", {
                                    type: "checkbox",
                                    className:
                                      "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer",
                                    defaultChecked: !0,
                                  }),
                                  e.jsx("span", {
                                    className: "ml-2 text-sm text-gray-700",
                                    children: "All Students (Class 11-A)",
                                  }),
                                ],
                              }),
                              e.jsxs("label", {
                                className: "flex items-center",
                                children: [
                                  e.jsx("input", {
                                    type: "checkbox",
                                    className:
                                      "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer",
                                  }),
                                  e.jsx("span", {
                                    className: "ml-2 text-sm text-gray-700",
                                    children: "Parents/Guardians",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "flex space-x-4",
                        children: [
                          e.jsxs("button", {
                            type: "submit",
                            className:
                              "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap",
                            children: [
                              e.jsx("i", {
                                className: "ri-send-plane-line mr-2",
                              }),
                              "Send Notification",
                            ],
                          }),
                          e.jsxs("button", {
                            type: "button",
                            className:
                              "bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap",
                            children: [
                              e.jsx("i", { className: "ri-save-line mr-2" }),
                              "Save as Draft",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
        ],
      }),
    ],
  });
}
export { N as default };
//# sourceMappingURL=page-87hYISML.js.map
