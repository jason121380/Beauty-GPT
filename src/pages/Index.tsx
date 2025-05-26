import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Copy, Check, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const prompts = [
  {
    id: 1,
    title: "撰寫引人入勝的產品描述",
    description: "為電子商務網站撰寫引人入勝的產品描述，突出其主要功能和優勢。",
    category: "電子商務",
    content: "為 [產品名稱] 撰寫引人入勝的產品描述，突出其主要功能和優勢。包括目標受眾、產品解決的問題以及產品的獨特賣點。",
  },
  {
    id: 2,
    title: "產生社群媒體貼文",
    description: "產生社群媒體貼文，以宣傳新產品或服務。",
    category: "社群媒體",
    content: "產生社群媒體貼文，以宣傳 [產品/服務名稱]。包括產品/服務的簡短描述、目標受眾以及行動呼籲。",
  },
  {
    id: 3,
    title: "撰寫部落格文章",
    description: "撰寫關於特定主題的部落格文章。",
    category: "內容行銷",
    content: "撰寫關於 [主題] 的部落格文章。包括引言、正文和結論。使用清晰簡潔的語言。",
  },
  {
    id: 4,
    title: "產生電子郵件行銷活動",
    description: "產生電子郵件行銷活動，以宣傳新產品或服務。",
    category: "電子郵件行銷",
    content: "產生電子郵件行銷活動，以宣傳 [產品/服務名稱]。包括主旨行、正文和行動呼籲。使用引人入勝且個性化的語言。",
  },
  {
    id: 5,
    title: "產生廣告文案",
    description: "產生廣告文案，以宣傳新產品或服務。",
    category: "廣告",
    content: "產生廣告文案，以宣傳 [產品/服務名稱]。包括標題、正文和行動呼籲。使用引人入勝且有說服力的語言。",
  },
  {
    id: 6,
    title: "產生網站文案",
    description: "產生網站文案，以宣傳新產品或服務。",
    category: "網站文案",
    content: "產生網站文案，以宣傳 [產品/服務名稱]。包括標題、正文和行動呼籲。使用清晰簡潔的語言。",
  },
  {
    id: 7,
    title: "產生影片腳本",
    description: "產生影片腳本，以宣傳新產品或服務。",
    category: "影片行銷",
    content: "產生影片腳本，以宣傳 [產品/服務名稱]。包括標題、正文和行動呼籲。使用引人入勝且視覺化的語言。",
  },
  {
    id: 8,
    title: "產生簡報",
    description: "產生簡報，以宣傳新產品或服務。",
    category: "簡報",
    content: "產生簡報，以宣傳 [產品/服務名稱]。包括標題、正文和行動呼籲。使用清晰簡潔的語言。",
  },
  {
    id: 9,
    title: "產生新聞稿",
    description: "產生新聞稿，以宣傳新產品或服務。",
    category: "公關",
    content: "產生新聞稿，以宣傳 [產品/服務名稱]。包括標題、正文和行動呼籲。使用清晰簡潔的語言。",
  },
  {
    id: 10,
    title: "產生案例研究",
    description: "產生案例研究，以宣傳新產品或服務。",
    category: "案例研究",
    content: "產生案例研究，以宣傳 [產品/服務名稱]。包括標題、正文和行動呼籲。使用清晰簡潔的語言。",
  },
];

const categories = ["全部", ...new Set(prompts.map((prompt) => prompt.category))];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const filteredPrompts = useMemo(() => {
    let filtered = prompts;

    if (selectedCategory !== "全部") {
      filtered = filtered.filter((prompt) => prompt.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((prompt) => {
        const term = searchTerm.toLowerCase();
        return (
          prompt.title.toLowerCase().includes(term) ||
          prompt.description.toLowerCase().includes(term) ||
          prompt.category.toLowerCase().includes(term)
        );
      });
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "已複製!",
      description: "提示詞已複製到剪貼簿。",
    });
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const CategoryButton = ({ category }: { category: string }) => (
    <Button
      variant={selectedCategory === category ? "default" : "outline"}
      size="sm"
      onClick={() => {
        setSelectedCategory(category);
        setIsMobileMenuOpen(false);
      }}
      className="whitespace-nowrap text-xs sm:text-sm"
    >
      {category}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            AI 提示詞目錄
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6">
            精選高質量的 AI 提示詞，幫助您更好地與 AI 交互
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="搜尋提示詞..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6 sm:mb-8">
          {/* Desktop Categories */}
          <div className="hidden sm:flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <CategoryButton key={category} category={category} />
            ))}
          </div>

          {/* Mobile Categories */}
          <div className="sm:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>{selectedCategory}</span>
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[300px]">
                <div className="flex flex-col gap-2 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">選擇分類</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <CategoryButton key={category} category={category} />
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-sm text-gray-600">
            找到 {filteredPrompts.length} 個提示詞
          </p>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {filteredPrompts.map((prompt) => (
            <Card key={prompt.id} className="hover:shadow-lg transition-all duration-200 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2">
                    {prompt.title}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    {prompt.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm line-clamp-3 mb-4">
                  {prompt.description}
                </CardDescription>
                <Button
                  onClick={() => copyToClipboard(prompt.content, prompt.id)}
                  size="sm"
                  className="w-full text-sm"
                  disabled={copiedId === prompt.id}
                >
                  {copiedId === prompt.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      已複製
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      複製提示詞
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base sm:text-lg">
              沒有找到符合條件的提示詞
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
