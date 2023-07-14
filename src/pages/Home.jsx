import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Table } from "antd";
import api from "../api";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [vaccineData, setVaccineData] = useState([]);
  const approval = (jwt, id) => {
    api
      .post("/approve", {
        token: jwt,
        vaccination_id: id,
      })
      .then((res) =>
        res.data.success === true
          ? api
              .post("/allvaccines", {
                token: localStorage.getItem("jwt"),
              })
              .then((res) => {
                setLoading(false);
                setVaccineData(res.data);
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              })
          : ""
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    api
      .post("/allvaccines", {
        token: localStorage.getItem("jwt"),
      })
      .then((res) => {
        setLoading(false);
        setVaccineData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const columns = [
    { title: "User ID", dataIndex: "user_id", Key: "user_id" },
    {
      title: "Created",
      dataIndex: "created_at",
      Key: "user_id",
      render: (created, record) => {
        return <div>{created.slice(0, 10)}</div>;
      },
    },
    {
      title: "Vaccine Date",
      dataIndex: "vaccination_date",
      Key: "vaccination_date",
      sorter: (a, b) => {
        a.vaccination_date - b.vaccination_date;
      },
    },
    {
      title: "Verification",
      dataIndex: "verified",
      Key: "verified",
      render: (verified, record) => {
        return (
          <div>
            {verified ? (
              <div className="text-green-600">Verified</div>
            ) : (
              <div className="text-yellow-600">Pending</div>
            )}
          </div>
        );
      },
    },
    {
      title: "Certificate",
      dataIndex: "certificate_url",
      Key: "certificate_url",
      render: (cert, record) => {
        return <a href={`${cert}`}>{cert.slice(0, 20).concat("...")}</a>;
      },
    },
    {
      title: "Action",
      dataIndex: "approve",
      Key: "approve",
      render: (approve, record) => {
        return (
          <button
            className="hover:underline bg-blue-500 rounded-sm text-white px-2 py-1"
            onClick={() =>
              approval(localStorage.getItem("jwt"), record.id)
            }
          >
            Approve
          </button>
        );
      },
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="w-full mt-8 flex flex-col gap-4 justify-center px-2 lg:px-20">
        <Table
          loading={loading}
          dataSource={vaccineData}
          columns={columns}
          style={{ overflowX: "auto" }}
        />
      </div>
    </div>
  );
};

export default Home;
