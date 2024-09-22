"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { getCurrentTheme, setTheme } from "@/utils/theme/utils";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { useUser } from "../UserContext";
import { ThemeDiamond } from "./theme-diamond";

export default function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = React.useState("default");
    const t = useTranslations("header.themeSwitcher");

    // Load and set the initial theme on mount
    // React.useEffect(() => {
    //     const initialTheme = user?.settings.theme || getCurrentTheme();
    //     setTheme(initialTheme);
    //     setCurrentTheme(initialTheme);
    // }, [user]);

    const handleThemeChange = React.useCallback((theme: any) => {
        setTheme(theme);
        setCurrentTheme(theme);

        // if (user) {
        //     user.settings.theme = theme;
        //     saveData(user);
        // }
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <ThemeDiamond title={currentTheme} color={"current"} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange("default")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "default" })} color={"default"} />
                        <div>{t("theme", { theme: "default" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("palette")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "palette" })} color={"palette"} />
                        <div>{t("theme", { theme: "palette" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("amethyst")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "amethyst" })} color={"amethyst"} />
                        <div>{t("theme", { theme: "amethyst" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("sapphire")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "sapphire" })} color={"sapphire"} />
                        <div>{t("theme", { theme: "sapphire" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("emerald")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "emerald" })} color={"emerald"} />
                        <div>{t("theme", { theme: "emerald" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("ruby")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "ruby" })} color={"ruby"} />
                        <div>{t("theme", { theme: "ruby" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("coral")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "coral" })} color={"coral"} />
                        <div>{t("theme", { theme: "coral" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("amber")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "amber" })} color={"amber"} />
                        <div>{t("theme", { theme: "amber" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("daylight")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "daylight" })} color={"daylight"} />
                        <div>{t("theme", { theme: "daylight" })}</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("midnight")} className="group">
                    <div className="flex items-center space-x-2">
                        <ThemeDiamond title={t("theme", { theme: "midnight" })} color={"midnight"} />
                        <div>{t("theme", { theme: "midnight" })}</div>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
