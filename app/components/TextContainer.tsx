'use client'

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { IoMdSearch } from '@react-icons/all-files/io/IoMdSearch'
import Image from 'next/image'
import Link from 'next/link'
import data from '../data/data.json'
import { Question } from '../types'

interface Data {
  questions: Question[]
  choices: any[]
}

const TextContainer: React.FC = () => {
  const [activeLink, setActiveLink] = useState('全て')
  const [questions, setQuestions] = useState<Question[]>([])

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
  }

  // APIから取得する関数（仮）
  const fetchQuestions = async () => {
    const response: Data = data
    setQuestions(response.questions)
  }

  React.useEffect(() => {
    fetchQuestions()
  }, [])

  const filteredQuestions = questions.filter((question) => {
    if (activeLink === '中学1年生') return question.grade_1
    if (activeLink === '中学2年生') return question.grade_2
    if (activeLink === '中学3年生') return question.grade_3
    return true
  })

  return (
    <div className="flex flex-col items-center w-full mt-24 md:mt-0">
      <div className="w-full max-w-[1000px]">
        <section className="w-full  ">
          <h2 className="text-lg font-bold mb-4">教材</h2>
          {/* 教材のコンテンツをここに追加 */}
        </section>

        <Input
          type="text"
          placeholder="教材を検索..."
          startIcon={<IoMdSearch className="text-gray-400" />}
        />

        <section className="w-full border-b border-gray-300 py-4">
          <nav>
            <ul className="flex space-x-4 ">
              <li>
                <a
                  href="#"
                  className={`font-semibold ${
                    activeLink === '中学1年生'
                      ? 'text-[#ff223c] border-b-2 border-[#ff223c]'
                      : ''
                  }`}
                  onClick={() => handleLinkClick('中学1年生')}
                >
                  中学1年生
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`font-semibold ${
                    activeLink === '中学2年生'
                      ? 'text-[#ff223c] border-b-2 border-[#ff223c]'
                      : ''
                  }`}
                  onClick={() => handleLinkClick('中学2年生')}
                >
                  中学2年生
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`font-semibold ${
                    activeLink === '中学3年生'
                      ? 'text-[#ff223c] border-b-2 border-[#ff223c]'
                      : ''
                  }`}
                  onClick={() => handleLinkClick('中学3年生')}
                >
                  中学3年生
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`font-semibold ${
                    activeLink === '全て'
                      ? 'text-[#ff223c] border-b-2 border-[#ff223c]'
                      : ''
                  }`}
                  onClick={() => handleLinkClick('全て')}
                >
                  全て
                </a>
              </li>
            </ul>
          </nav>
        </section>

        <section>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {filteredQuestions.map((question, index) => (
              <li key={question.id}>
                <Link href={`/questions/${question.id}`}>
                  <div className="relative w-full h-0 pb-[100%]">
                    <Image
                      src="/images/noimage.png"
                      alt={question.text}
                      fill
                      sizes="(max-width: 640px) 100vw, 500px"
                      className="object-cover rounded-s"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    サンプル問題{index + 1}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default TextContainer
